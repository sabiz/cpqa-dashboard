import MutRequest from './mutRequet';

export default class Barometer implements MutRequest {
    readonly name: string = "Barometer";
    readonly nameShort: string = "Baro";
    readonly requestId: number = 0x15;
    readonly unitStr: string = "kPa";
    readonly min: number = 0;
    readonly max: number = 126;

    eval(x: number): number {
        return 0.49*x;
    }
}