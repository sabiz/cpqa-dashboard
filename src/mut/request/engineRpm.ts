import type MutRequest from './mutRequest';

export default class EngineRpm implements MutRequest {
    readonly name: string = "EngineRPM";
    readonly nameShort: string = "RPM";
    readonly requestId: number = 0x21;
    readonly unitStr: string = "rpm";
    readonly min: number = 0;
    readonly max: number = 80;

    eval(x: number): number {
        return 31.25*x;
    }
}