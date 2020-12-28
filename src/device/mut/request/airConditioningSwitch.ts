import MutRequest from './mutRequet';

export default class AirConditioningSwitch implements MutRequest {
    readonly name: string = "AirConditioningSwitch";
    readonly nameShort: string = "ACSwitch";
    readonly requestId: number = 0x4A;
    readonly unitStr: string = "On/Off";
    readonly min: number = 0;
    readonly max: number = 255;

    eval(x: number): number {
        return x & 0b0001_0000;
    }
}