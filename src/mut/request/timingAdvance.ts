import type MutRequest from './mutRequest';

export default class TimingAdvance implements MutRequest {
    readonly name: string = "TimingAdvance";
    readonly nameShort: string = "TimingAdv";
    readonly requestId: number = 0x06;
    readonly unitStr: string = "deg";
    readonly min: number = 0;
    readonly max: number = 50;

    eval(x: number): number {
        return x-20;
    }
}