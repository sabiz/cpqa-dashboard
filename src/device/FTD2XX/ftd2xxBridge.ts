import * as ffi from 'ffi-napi';
import * as ref from 'ref-napi';

export const intRef = ref.refType(ref.types.int);
export const uintRef = ref.refType(ref.types.uint);
export const uint64Ref = ref.refType(ref.types.uint64);
export const ucharRef = ref.refType(ref.types.uchar);
export const stringRef = ref.types.CString;

interface BufferEx extends Buffer {
    type: ref.Type
}

function alloc(size: number, type: ref.Type) : Buffer {
    const buf = Buffer.alloc(size) as BufferEx;
    buf.type = type;
    return buf;
}

export function allocUint64():Buffer {
    return alloc(ref.types.uint64.size, ref.types.uint64);
}

export function allocInt():Buffer {
    return alloc(ref.types.int.size, ref.types.int);
}

export function allocUint():Buffer {
    return alloc(ref.types.uint.size, ref.types.uint);
}

export function allocUchar():Buffer {
    return alloc(ref.types.uchar.size, ref.types.uchar);
}

export function allocUcharSize(size:number):Buffer {
    return alloc(size, ref.types.uchar);
}

export function allocString(size: number):Buffer {
    return alloc(size, ref.types.int);
}

export function getString(buf: Buffer): string {
    return ref.readCString(buf);
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
const symbols:{[key: string]: any[]} = {
    'FT_ListDevices': ['ulong', [intRef, stringRef, 'uint']],
    'FT_Open': ['ulong', ['int', uint64Ref]],
    'FT_Purge': ['ulong', ['uint64', 'uint']],
    'FT_SetBaudRate': ['ulong', ['uint64', 'uint']],
    'FT_SetDataCharacteristics': ['ulong', ['uint64', 'uchar', 'uchar', 'uchar']],
    'FT_SetFlowControl': ['ulong', ['uint64', 'ushort', 'uchar', 'uchar']],
    'FT_SetTimeouts': ['ulong', ['uint64', 'uint', 'uint']],
    'FT_SetLatencyTimer': ['ulong', ['uint64', 'uchar']],
    'FT_GetLatencyTimer': ['ulong', ['uint64', ucharRef]],
    'FT_ClrDtr': ['ulong', ['uint64']],
    'FT_SetDtr': ['ulong', ['uint64']],
    'FT_SetBreakOn': ['ulong', ['uint64']],
    'FT_SetBreakOff': ['ulong', ['uint64']],
    'FT_Write': ['ulong', ['uint64', 'pointer', 'uint', uintRef]],
    'FT_Read': ['ulong', ['uint64', 'pointer', 'uint', uintRef]],
    'FT_Close': ['ulong', ['uint64']],
};
let LIB_NAME = 'FTD2XX';
if (process.platform!=='win32') {
    symbols['FT_SetVIDPID'] = ['ulong', ['uint', 'uint']];
    LIB_NAME = 'libftd2xx';
}
const lib = ffi.Library(LIB_NAME, symbols);
const libAlt = ffi.Library(LIB_NAME,{
    'FT_ListDevices': ['ulong', ['int', stringRef, 'uint']],
});

// Functions
export const FT_SetVIDPID = lib.FT_SetVIDPID;
export const FT_ListDevices = lib.FT_ListDevices;
export const FT_ListDevicesString = libAlt.FT_ListDevices;
export const FT_Open = lib.FT_Open;
export const FT_Purge = lib.FT_Purge;
export const FT_SetBaudRate = lib.FT_SetBaudRate;
export const FT_SetDataCharacteristics =lib.FT_SetDataCharacteristics;
export const FT_SetFlowControl = lib.FT_SetFlowControl;
export const FT_SetTimeouts = lib.FT_SetTimeouts;
export const FT_SetLatencyTimer = lib.FT_SetLatencyTimer;
export const FT_GetLatencyTimer = lib.FT_GetLatencyTimer;
export const FT_ClrDtr = lib.FT_ClrDtr;
export const FT_SetDtr = lib.FT_SetDtr;
export const FT_SetBreakOn = lib.FT_SetBreakOn;
export const FT_SetBreakOff = lib.FT_SetBreakOff;
export const FT_Write = lib.FT_Write;
export const FT_Read = lib.FT_Read;
export const FT_Close = lib.FT_Close;
/* eslint-enable */

// FT_STATUS
export const FT_OK = 0;
export const FT_INVALID_HANDLE = 1;
export const FT_DEVICE_NOT_FOUND = 2;
export const FT_DEVICE_NOT_OPENED = 3;
export const FT_IO_ERROR = 4;
export const FT_INSUFFICIENT_RESOURCES = 5;
export const FT_INVALID_PARAMETER = 6;
export const FT_INVALID_BAUD_RATE = 7;
export const FT_DEVICE_NOT_OPENED_FOR_ERASE = 8;
export const FT_DEVICE_NOT_OPENED_FOR_WRITE = 9;
export const FT_FAILED_TO_WRITE_DEVICE = 10;
export const FT_EEPROM_READ_FAILED = 11;
export const FT_EEPROM_WRITE_FAILED = 12;
export const FT_EEPROM_ERASE_FAILED = 13;
export const FT_EEPROM_NOT_PRESENT = 14;
export const FT_EEPROM_NOT_PROGRAMMED = 15;
export const FT_INVALID_ARGS = 16;
export const FT_NOT_SUPPORTED = 17;
export const FT_OTHER_ERROR = 18;

// FT_List_Devices
export const FT_LIST_NUMBER_ONLY = 0x80000000;
export const FT_LIST_BY_INDEX = 0x40000000;
export const FT_LIST_ALL = 0x20000000;

// FT_OpenEx
export const FT_OPEN_BY_SERIAL_NUMBER = 1;
export const FT_OPEN_BY_DESCRIPTION = 2;
export const FT_OPEN_BY_LOCATION = 4;

// FT_Purge
export const FT_PURGE_RX = 1;
export const FT_PURGE_TX = 2;

// FT_SetDataCharacteristics
export const FT_BITS_8 = 8;
export const FT_BITS_7 = 7;

export const FT_STOP_BITS_1 = 0;
export const FT_STOP_BITS_2 = 2;

export const FT_PARITY_NONE = 0;
export const FT_PARITY_ODD = 1;
export const FT_PARITY_EVEN = 2;
export const FT_PARITY_MARK = 3;
export const FT_PARITY_SPACE = 4;

// FT_SetFlowControl
export const FT_FLOW_NONE = 0x0000;
export const FT_FLOW_RTS_CTS = 0x0100;
export const FT_FLOW_DTR_DSR = 0x0200;
export const FT_FLOW_XON_XOFF = 0x0400;
