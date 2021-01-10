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

interface DisplayItem {
    name: string,
    intervalMs: number
}

interface ConfApp {
    port: number,
    displayItems: Array<DisplayItem>
}

const confLog = config.get<ConfLog>('log');
const confDevice = config.get<ConfDevice>('device');
const confApp = config.get<ConfApp>('app');

export {
    confLog,
    confDevice,
    confApp
};