import config from 'config';

interface ConfLog {
    level: string,
    fileOut: boolean,
    fileName: string,
    maxSize: number,
    maxFiles: number
}

interface ConfDevice {
    mock: boolean,
    vendorId: number,
    productId: number,
    baudRate: number
}

const confLog = config.get<ConfLog>('log');
const confDevice = config.get<ConfDevice>('device');

export {
    confLog,
    confDevice
};