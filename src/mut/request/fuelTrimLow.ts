import type MutRequest from './mutRequest';

export default class FuelTrimLow implements MutRequest {
    readonly name: string = "FuelTrimLow";
    readonly nameShort: string = "FuelTrimLow";
    readonly requestId: number = 0x0C;
    readonly unitStr: string = "%";
    readonly min: number = -15;
    readonly max: number = 15;

    eval(x: number): number {
        return (0.1961*x)-25; // 0.78125 * x  ?
    }
}