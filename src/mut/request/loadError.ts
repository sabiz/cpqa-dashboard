import type MutRequest from './mutRequest';

export default class LoadError implements MutRequest {
    readonly name: string = "LoadError";
    readonly nameShort: string = "LoadError";
    readonly requestId: number = 0x8A;
    readonly unitStr: string = "load";
    readonly min: number = -25;
    readonly max: number = 25;

    eval(x: number): number {
        return 0.15625*x-20;
    }
}