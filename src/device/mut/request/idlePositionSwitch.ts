import MutRequest from './mutRequet';

export default class IdlePositionSwitch implements MutRequest {
    readonly name: string = "IdlePositionSwitch";
    readonly nameShort: string = "IdlePosSw";
    readonly requestId: number = 0x4A;
    readonly unitStr: string = "On/Off";
    readonly min: number = 0;
    readonly max: number = 255;

    eval(x: number): number {
        return x & 0b1000_0000;
    }
}