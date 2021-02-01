#define FTD2XX_EXPORTS

#include <map>
#include <thread>
#include <chrono>
#include <napi.h>
#include "ftd2xx.h"

#define MUT_BAUDRATE 15625
#define MUT_TIMEOUT 1000
#define OPEN_RETRY_COUNT 10
#define SLEEP_MS(t) (std::this_thread::sleep_for(std::chrono::milliseconds(t)))

const std::map<FT_STATUS, std::string> STATUS_STR_TABLE = {
    {FT_OK, "OK"},
    {FT_INVALID_HANDLE, "INVALID_HANDLE"},
    {FT_DEVICE_NOT_FOUND, "DEVICE_NOT_FOUND"},
    {FT_DEVICE_NOT_OPENED, "DEVICE_NOT_OPENED"},
    {FT_IO_ERROR, "IO_ERROR"},
    {FT_INSUFFICIENT_RESOURCES, "INSUFFICIENT_RESOURCES"},
    {FT_INVALID_PARAMETER, "INVALID_PARAMETER"},
    {FT_INVALID_BAUD_RATE, "INVALID_BAUD_RATE"},
    {FT_DEVICE_NOT_OPENED_FOR_ERASE, "DEVICE_NOT_OPENED_FOR_ERASE"},
    {FT_DEVICE_NOT_OPENED_FOR_WRITE, "DEVICE_NOT_OPENED_FOR_WRITE"},
    {FT_FAILED_TO_WRITE_DEVICE, "FAILED_TO_WRITE_DEVICE"},
    {FT_EEPROM_READ_FAILED, "EEPROM_READ_FAILED"},
    {FT_EEPROM_WRITE_FAILED, "EEPROM_WRITE_FAILED"},
    {FT_EEPROM_ERASE_FAILED, "EEPROM_ERASE_FAILED"},
    {FT_EEPROM_NOT_PRESENT, "EEPROM_NOT_PRESENT"},
    {FT_EEPROM_NOT_PROGRAMMED, "EEPROM_NOT_PROGRAMMED"},
    {FT_INVALID_ARGS, "INVALID_ARGS"},
    {FT_NOT_SUPPORTED, "NOT_SUPPORTED"},
    {FT_OTHER_ERROR, "OTHER_ERROR"},
    {FT_DEVICE_LIST_NOT_READY, "DEVICE_LIST_NOT_READY"},
};



class Mut : public Napi::ObjectWrap<Mut> {

    
  private:
    static Napi::FunctionReference constructor;
    FT_HANDLE ftHandle;
    Napi::Value makeResult(Napi::Env env, Napi::Number value, FT_STATUS status) {
        Napi::Object result = Napi::Object::New(env);
        result.Set("value", value);
        result.Set("status", Napi::String::New(env, STATUS_STR_TABLE.at(status)));
        result.Set("isSuccess", Napi::Boolean::New(env, FT_SUCCESS(status)));
        return result;
    }
    Napi::Value makeResult(Napi::Env env, FT_STATUS status) {
        Napi::Object result = Napi::Object::New(env);
        result.Set("status", Napi::String::New(env, STATUS_STR_TABLE.at(status)));
        result.Set("isSuccess", Napi::Boolean::New(env, FT_SUCCESS(status)));
        return result;
    }

    Napi::Value Open(const Napi::CallbackInfo &info) {
        if(this->ftHandle != NULL) {
            this->Close(info);
        }
        Napi::Env env = info.Env();
        Napi::Number dIndex = info[0].As<Napi::Number>();
        int deviceIndex = dIndex.Int32Value();

        FT_STATUS status = FT_Open(deviceIndex, &(this->ftHandle));
        if(!FT_SUCCESS(status)) return makeResult(env, status);

        status = FT_Purge(this->ftHandle, FT_PURGE_RX | FT_PURGE_TX);
        if(!FT_SUCCESS(status)) return makeResult(env, status);

        status = FT_SetBaudRate(this->ftHandle, MUT_BAUDRATE);
        if(!FT_SUCCESS(status)) return makeResult(env, status);

        status = FT_SetDataCharacteristics(this->ftHandle, FT_BITS_8, FT_STOP_BITS_1, FT_PARITY_NONE);
        if(!FT_SUCCESS(status)) return makeResult(env, status);

        status = FT_SetFlowControl(this->ftHandle, FT_FLOW_NONE, 0, 0);
        if(!FT_SUCCESS(status)) return makeResult(env, status);

        status = FT_SetTimeouts(this->ftHandle, MUT_TIMEOUT, MUT_TIMEOUT);
        if(!FT_SUCCESS(status)) return makeResult(env, status);

        UCHAR latencyTimer = 0;
        status = FT_GetLatencyTimer(this->ftHandle, &latencyTimer);
        if(!FT_SUCCESS(status)) return makeResult(env, status);

        status = FT_SetLatencyTimer(this->ftHandle, 1);
        if(!FT_SUCCESS(status)) return makeResult(env, status);

        status = FT_SetDtr(this->ftHandle);
        if(!FT_SUCCESS(status)) return makeResult(env, status);
        SLEEP_MS(500);

        status = FT_ClrDtr(this->ftHandle);
        if(!FT_SUCCESS(status)) return makeResult(env, status);
        SLEEP_MS(740);

        status = FT_SetDtr(this->ftHandle);
        if(!FT_SUCCESS(status)) return makeResult(env, status);
        SLEEP_MS(600);

        char req[1] = {0x17};
        DWORD writtenLength = 0;
        char openCheckBuff[2];
        char readBuff[4];
        DWORD returnedLength = 0;

        for(int i = 0; i < OPEN_RETRY_COUNT; i++) {
            memset(openCheckBuff, 0, sizeof(openCheckBuff));
            memset(readBuff, 0, sizeof(readBuff));
            status = FT_Write(this->ftHandle, req, sizeof(req), &writtenLength);
            if(!FT_SUCCESS(status)) return makeResult(env, status);

            status = FT_Read(this->ftHandle, openCheckBuff, sizeof(openCheckBuff), &returnedLength);
            if(!FT_SUCCESS(status)) return makeResult(env, status);
            
            if(openCheckBuff[1] != 0) { // already open
                return makeResult(env, status);
            }

            status = FT_SetBreakOn(this->ftHandle);
            if(!FT_SUCCESS(status)) return makeResult(env, status);
            SLEEP_MS(1800);

            status = FT_SetBreakOff(this->ftHandle);
            if(!FT_SUCCESS(status)) return makeResult(env, status);

            status = FT_Read(this->ftHandle, readBuff, sizeof(readBuff), &returnedLength);
            if(!FT_SUCCESS(status)) return makeResult(env, status);

            if(readBuff[0] != readBuff[1] && readBuff[2] != readBuff[3]) {
                return makeResult(env, status);
            }
            SLEEP_MS(10);
        }

        return makeResult(env, FT_OTHER_ERROR);
    }

    void Close(const Napi::CallbackInfo &info) {
        if(this->ftHandle == NULL) {
            return;
        }
        FT_Close(this->ftHandle);
        this->ftHandle = NULL; 
    }

    Napi::Value Request(const Napi::CallbackInfo &info) {
        Napi::Env env = info.Env();
        Napi::Number reqId = info[0].As<Napi::Number>();
        UCHAR requestId = reqId.Int32Value();
        DWORD length = 0;
        Napi::Number noResult = Napi::Number::New(env, 0);
        FT_STATUS status = FT_Write(this->ftHandle, &requestId, sizeof(UCHAR), &length);
        if(!FT_SUCCESS(status)) return makeResult(env, noResult, status);
        SLEEP_MS(2);
        UCHAR readBuff[2];
        status = FT_Read(this->ftHandle, readBuff, sizeof(readBuff), &length);
        if(!FT_SUCCESS(status)) return makeResult(env, noResult, status);

        return makeResult(env, Napi::Number::New(env, readBuff[1]), status);
    }

    Napi::Value DeviceCount(const Napi::CallbackInfo &info) {
        DWORD numDevs = 0;
        FT_STATUS status = FT_ListDevices(&numDevs,NULL,FT_LIST_NUMBER_ONLY);
        Napi::Env env = info.Env();
        return makeResult(env, Napi::Number::New(env, numDevs), status);
    }

  public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports) {
        Napi::Function func = DefineClass(env, "Mut", {
            InstanceAccessor("deviceCount", &Mut::DeviceCount, nullptr, napi_default),
            InstanceMethod("open", &Mut::Open, napi_default),
            InstanceMethod("close", &Mut::Close, napi_default),
            InstanceMethod("request", &Mut::Request, napi_default)
        });

        constructor = Napi::Persistent(func);
        constructor.SuppressDestruct();
        exports.Set("Mut", func);
        return exports;
    }
    Mut(const Napi::CallbackInfo &info);
};

Mut::Mut(const Napi::CallbackInfo &info) : Napi::ObjectWrap<Mut>(info) {
    Napi::Number vId = info[0].As<Napi::Number>();
    DWORD vender = vId.Int32Value();
    Napi::Number pId = info[1].As<Napi::Number>();
    DWORD product = pId.Int32Value();

#ifndef WIN32
    FT_SetVIDPID(vender, product);
#endif

    this->ftHandle = NULL;
}

Napi::FunctionReference Mut::constructor;


// ----------------------------------------------------------------------------
// napi Functions
// ----------------------------------------------------------------------------
Napi::Object Init (Napi::Env env, Napi::Object exports) {
    Mut::Init(env, exports);
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)