import MutRequest from './mutRequet';

export default class PowerSteeringSwitch implements MutRequest {
    readonly name: string = "PowerSteeringSwitch";
    readonly nameShort: string = "PwrSteeringSw";
    readonly requestId: number = 0x4A;
    readonly unitStr: string = "On/Off";
    readonly min: number = 0;
    readonly max: number = 255;

    eval(x: number): number {
        return x & 0b0000_1000;
    }
}