import type MutRequest from './mutRequest';

export default class InhibitorSwitch implements MutRequest {
    readonly name: string = "InhibitorSwitch";
    readonly nameShort: string = "InhibitorSw";
    readonly requestId: number = 0x4A;
    readonly unitStr: string = "On/Off";
    readonly min: number = 0;
    readonly max: number = 255;

    eval(x: number): number {
        return x & 0b0010_0000;
    }
}