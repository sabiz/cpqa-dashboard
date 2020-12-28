import MutRequest from './mutRequet';

export default class KnockSum implements MutRequest {
    readonly name: string = "KnockSum";
    readonly nameShort: string = "KnockSum";
    readonly requestId: number = 0x26;
    readonly unitStr: string = "count";
    readonly min: number = 0;
    readonly max: number = 50;

    eval(x: number): number {
        return x;
    }
}