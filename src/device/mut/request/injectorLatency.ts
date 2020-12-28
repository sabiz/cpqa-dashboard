import MutRequest from './mutRequet';

export default class InjectorLatency implements MutRequest {
    readonly name: string = "InjectorLatency";
    readonly nameShort: string = "InjectorLatency";
    readonly requestId: number = 0x79;
    readonly unitStr: string = "";
    readonly min: number = 0;
    readonly max: number = 255;

    eval(x: number): number {
        return x;
    }
}