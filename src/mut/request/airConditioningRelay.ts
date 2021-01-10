import type MutRequest from './mutRequest';

export default class AirConditioningRelay implements MutRequest {
    readonly name: string = "AirConditioningRelay";
    readonly nameShort: string = "ACRelaySw";
    readonly requestId: number = 0x49;
    readonly unitStr: string = "On/Off";
    readonly min: number = 0;
    readonly max: number = 255;

    eval(x: number): number {
        return x & 0b0000_0100;
    }
}