// import {localFtd2xxBridge}  from './ftd2xxBridgeMock';
// const FTD2XX = localFtd2xxBridge;
import * as FTD2XX from './ftd2xxBridge';

import log from '../../util/log';

export default class D2XX {

    static readonly PURGE_RX = FTD2XX.FT_PURGE_RX;
    static readonly PURGE_TX = FTD2XX.FT_PURGE_TX;
    static readonly PURGE_ALL = FTD2XX.FT_PURGE_RX | FTD2XX.FT_PURGE_TX;

    static readonly BITS_8 = FTD2XX.FT_BITS_8;
    static readonly BITS_7 = FTD2XX.FT_BITS_7;

    static readonly STOP_BITS_1 = FTD2XX.FT_STOP_BITS_1;
    static readonly STOP_BITS_2 = FTD2XX.FT_STOP_BITS_2;

    static readonly PARITY_NONE = FTD2XX.FT_PARITY_NONE;
    static readonly PARITY_ODD = FTD2XX.FT_PARITY_ODD;
    static readonly PARITY_EVEN = FTD2XX.FT_PARITY_EVEN;
    static readonly PARITY_MARK = FTD2XX.FT_PARITY_MARK;
    static readonly PARITY_SPACE = FTD2XX.FT_PARITY_SPACE;

    static readonly FLOW_NONE = FTD2XX.FT_FLOW_NONE;
    static readonly FLOW_RTS_CTS = FTD2XX.FT_FLOW_RTS_CTS;
    static readonly FLOW_DTR_DSR  = FTD2XX.FT_FLOW_DTR_DSR;
    static readonly FLOW_XON_XOFF = FTD2XX.FT_FLOW_XON_XOFF;

    private ftHandle: number;
    private ftStatus: number;

    constructor() {
        this.ftHandle = 0;
        this.ftStatus = FTD2XX.FT_OK;
    }

    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
    open(index: number): boolean  {
        const tmp =  FTD2XX.allocUint64();
        this.ftStatus = FTD2XX.FT_Open(index, tmp);
        if(this.checkErrorStatus()) {
            return false;
        } 
        this.ftHandle = FTD2XX.uint64Ref.get(tmp, 0) as number;
        return true;
    }

    close(): boolean {
        this.ftStatus = FTD2XX.FT_Close(this.ftHandle);
        return !this.checkErrorStatus();
    }

    purge(mask: number): boolean {
        this.ftStatus = FTD2XX.FT_Purge(this.ftHandle, mask);
        return !this.checkErrorStatus();
    }

    setBaudRate(baudRate: number): boolean {
        this.ftStatus = FTD2XX.FT_SetBaudRate(this.ftHandle, baudRate);
        return !this.checkErrorStatus();
    }

    setDataCharacteristics(wordLength:number, stopBits: number, parity: number): boolean {
        this.ftStatus = FTD2XX.FT_SetDataCharacteristics(this.ftHandle, wordLength, stopBits, parity);
        return !this.checkErrorStatus();
    }

    setFlowControl(flowControl:number, xOn: number, xOff:number): boolean {
        this.ftStatus = FTD2XX.FT_SetFlowControl(this.ftHandle, flowControl, xOn, xOff);
        return !this.checkErrorStatus();
    }

    setTimeouts(readTimeoutMs: number, writeTimeoutMs: number): boolean {
        this.ftStatus = FTD2XX.FT_SetTimeouts(this.ftHandle, readTimeoutMs, writeTimeoutMs);
        return !this.checkErrorStatus();
    }

    setLatencyTimer(timer: number): boolean {
        this.ftStatus = FTD2XX.FT_SetLatencyTimer(this.ftHandle, timer);
        return !this.checkErrorStatus();
    }

    getLatencyTimer(): [boolean, number?] {
        const tmp =  FTD2XX.allocUchar();
        this.ftStatus = FTD2XX.FT_GetLatencyTimer(this.ftHandle, tmp);
        if(this.checkErrorStatus()) {
            return [false];
        }
        return [true, FTD2XX.ucharRef.get(tmp, 0) as number];
    }

    setDtr(): boolean {
        this.ftStatus = FTD2XX.FT_SetDtr(this.ftHandle);
        return !this.checkErrorStatus();
    }

    clearDtr(): boolean {
        this.ftStatus = FTD2XX.FT_ClrDtr(this.ftHandle);
        return !this.checkErrorStatus();
    }

    breakOn(): boolean {
        this.ftStatus = FTD2XX.FT_SetBreakOn(this.ftHandle);
        return !this.checkErrorStatus();
    }
    
    breakOff(): boolean {
        this.ftStatus = FTD2XX.FT_SetBreakOff(this.ftHandle);
        return !this.checkErrorStatus();
    }

    writeByte(uchaData: number): [boolean, number?] {
        const tmp = FTD2XX.allocUchar();
        FTD2XX.ucharRef.set(tmp, 0, uchaData);
        const wrote = FTD2XX.allocUint64();
        this.ftStatus = FTD2XX.FT_Write(this.ftHandle, tmp, 1, wrote);
        if(this.checkErrorStatus()) {
            return [false];
        }
        return [true, FTD2XX.uint64Ref.get(wrote, 0) as number];
    }

    readBuffer(size: number): [boolean, Buffer?] {
        const tmp = FTD2XX.allocUcharSize(size);
        const read = FTD2XX.allocUint64();
        this.ftStatus = FTD2XX.FT_Read(this.ftHandle, tmp, size, read);
        if(this.checkErrorStatus()) {
            return [false];
        }
        return [true, tmp];
    }

    getLastStatusString(): string {
        switch(this.ftStatus){
            case FTD2XX.FT_OK: return 'OK';
            case FTD2XX.FT_INVALID_HANDLE: return 'INVALID_HANDLE';
            case FTD2XX.FT_DEVICE_NOT_FOUND: return 'DEVICE_NOT_FOUND';
            case FTD2XX.FT_DEVICE_NOT_OPENED: return 'DEVICE_NOT_OPENED';
            case FTD2XX.FT_IO_ERROR: return 'IO_ERROR';
            case FTD2XX.FT_INSUFFICIENT_RESOURCES: return 'INSUFFICIENT_RESOURCES';
            case FTD2XX.FT_INVALID_PARAMETER: return 'INVALID_PARAMETER';
            case FTD2XX.FT_INVALID_BAUD_RATE: return 'INVALID_BAUD_RATE';
            case FTD2XX.FT_DEVICE_NOT_OPENED_FOR_ERASE: return 'DEVICE_NOT_OPENED_FOR_ERASE';
            case FTD2XX.FT_DEVICE_NOT_OPENED_FOR_WRITE: return 'DEVICE_NOT_OPENED_FOR_WRITE';
            case FTD2XX.FT_FAILED_TO_WRITE_DEVICE: return 'FAILED_TO_WRITE_DEVICE';
            case FTD2XX.FT_EEPROM_READ_FAILED: return 'EEPROM_READ_FAILED';
            case FTD2XX.FT_EEPROM_WRITE_FAILED: return 'EEPROM_WRITE_FAILED';
            case FTD2XX.FT_EEPROM_ERASE_FAILED: return 'EEPROM_ERASE_FAILED';
            case FTD2XX.FT_EEPROM_NOT_PRESENT: return 'EEPROM_NOT_PRESENT';
            case FTD2XX.FT_EEPROM_NOT_PROGRAMMED: return 'EEPROM_NOT_PROGRAMMED';
            case FTD2XX.FT_INVALID_ARGS: return 'INVALID_ARGS';
            case FTD2XX.FT_NOT_SUPPORTED: return 'NOT_SUPPORTED';
            case FTD2XX.FT_OTHER_ERROR: return 'OTHER_ERROR';
        }
        return 'UNKNOWN';
    }

    private checkErrorStatus(): boolean {
       return D2XX.checkErrorStatus(this.ftStatus);
    }

    static addCustomDeviceId(vendorId: number, productId: number): boolean {
        const ftStatus = FTD2XX.FT_SetVIDPID(vendorId, productId);
        if(D2XX.checkErrorStatus(ftStatus)) {
            return false;
        }
        return true;
    }

    static getDeviceCount(): [boolean, number?] {
        const deviceCount = FTD2XX.allocInt();
        const ftStatus = FTD2XX.FT_ListDevices(deviceCount, null, FTD2XX.FT_LIST_NUMBER_ONLY);
        if(D2XX.checkErrorStatus(ftStatus)) {
            return [false];
        }
        return [true, FTD2XX.intRef.get(deviceCount, 0) as number];
    }

    static getDeviceDescription(index: number): [boolean, string?] {
        const deviceDescStr = FTD2XX.allocString(64);
        const ftStatus = FTD2XX.FT_ListDevicesString(index, deviceDescStr, FTD2XX.FT_LIST_BY_INDEX|FTD2XX.FT_OPEN_BY_DESCRIPTION);
        if(D2XX.checkErrorStatus(ftStatus)) {
            return [false];
        }
        return [true, FTD2XX.getString(deviceDescStr)];
    }

    private static checkErrorStatus(status: number): boolean {
        return status != FTD2XX.FT_OK;
    }
    /* eslint-enable */
}