import type MutRequest from './mutRequest';

export default class CoolantTemperature implements MutRequest {
    readonly name: string = "CoolantTemperature";
    readonly nameShort: string = "CoolantTemp";
    readonly requestId: number = 0x10;
    readonly unitStr: string = "℃";
    readonly min: number = 0; // Normal 85~95
    readonly max: number = 190;

    eval(x: number): number {
        return x-40;
    }
}