import MutRequest from './mutRequet';

export default class CrankSignalSwitch implements MutRequest {
    readonly name: string = "CrankSignalSwitch";
    readonly nameShort: string = "CrankSignalSw";
    readonly requestId: number = 0x4A;
    readonly unitStr: string = "On/Off";
    readonly min: number = 0;
    readonly max: number = 255;

    eval(x: number): number {
        return x & 0b0100_0000;
    }
}