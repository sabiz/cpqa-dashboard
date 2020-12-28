import MutRequest from './mutRequet';

export default class Boost implements MutRequest {
    readonly name: string = "Boost";
    readonly nameShort: string = "MAP";
    readonly requestId: number = 0x38;
    readonly unitStr: string = "kgf/cm2";
    readonly min: number = 0;
    readonly max: number = 350;

    eval(x: number): number {
        return 0.01334*x;
    }
}