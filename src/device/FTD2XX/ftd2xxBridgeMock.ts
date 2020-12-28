import * as ftd2xxBridge from './ftd2xxBridge';
import * as crypto from 'crypto';

export const localFtd2xxBridge = {...ftd2xxBridge};

/* eslint-disable  @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
localFtd2xxBridge['FT_ListDevices'] = function(buff: Buffer, b: any, c: any) :number {
    buff[0] = 1;
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_ListDevicesString'] = function(idx: number, buff: Buffer, c: any) :number {
    buff.writeCString(buff, 0, "MOCK DEVICE");
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_Open'] = function(idx: number, buff: Buffer) :number {
    buff.writeBigInt64BE(BigInt(9999999));
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_Purge'] = function(handle: number, param: number) :number {
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_SetBaudRate'] = localFtd2xxBridge['FT_Purge'];

localFtd2xxBridge['FT_SetDataCharacteristics'] = function(a: number, b: number, c: number, d: number) :number {
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_SetFlowControl'] = function(a: number, b: number, c: number, d: number) :number {
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_SetTimeouts'] = function(a: number, b: number, c: number) :number {
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_SetLatencyTimer'] = function(a: number, b: number) :number {
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_GetLatencyTimer'] = function(a: number, buff: Buffer) :number {
    buff[0] = 1;
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_ClrDtr'] = function(a: number) :number {
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_ClrDtr'] = localFtd2xxBridge['FT_SetDtr'];
localFtd2xxBridge['FT_SetBreakOn'] = localFtd2xxBridge['FT_SetDtr'];
localFtd2xxBridge['FT_SetBreakOff'] = localFtd2xxBridge['FT_SetDtr'];
localFtd2xxBridge['FT_Close'] = localFtd2xxBridge['FT_SetDtr'];

localFtd2xxBridge['FT_Write'] = function(handle: number, buff: Buffer, size: number, wroteBuff: Buffer) :number {
    wroteBuff.writeBigInt64BE(BigInt(size));
    return ftd2xxBridge.FT_OK;
}

localFtd2xxBridge['FT_Read'] = function(handle: number, buff: Buffer, size: number, readBuff: Buffer) :number {
    readBuff.writeBigInt64BE(BigInt(size));
    const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomStr = Array.from(crypto.randomFillSync(new Uint8Array(size))).map((n: any)=>S[n%S.length]).join('');
    buff.write(randomStr, "ascii");
    return ftd2xxBridge.FT_OK;
}
/* eslint-enable */