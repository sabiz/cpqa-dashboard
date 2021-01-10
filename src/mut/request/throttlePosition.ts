import type MutRequest from './mutRequest';

export default class ThrottlePosition implements MutRequest {
    readonly name: string = "ThrottlePosition";
    readonly nameShort: string = "TPS";
    readonly requestId: number = 0x17;
    readonly unitStr: string = "%";
    readonly min: number = 0;
    readonly max: number = 100;

    eval(x: number): number {
        return x*100/255;
    }
}