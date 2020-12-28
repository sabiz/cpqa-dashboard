import MutRequest from './mutRequet';

export default class FuelTrimHigh implements MutRequest {
    readonly name: string = "FuelTrimHigh";
    readonly nameShort: string = "FuelTrimHigh";
    readonly requestId: number = 0x0E;
    readonly unitStr: string = "%";
    readonly min: number = -15;
    readonly max: number = 15;

    eval(x: number): number {
        return (0.1961*x)-25; // 0.78125 * x  ?
    }
}