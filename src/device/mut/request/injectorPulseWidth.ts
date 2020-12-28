import MutRequest from './mutRequet';

export default class InjectorPulseWidth implements MutRequest {
    readonly name: string = "InjectorPulseWidth";
    readonly nameShort: string = "InjPulseWidth";
    readonly requestId: number = 0x29;
    readonly unitStr: string = "ms";
    readonly min: number = 0;
    readonly max: number = 66;

    eval(x: number): number {
        return 0.256*x;
    }
}