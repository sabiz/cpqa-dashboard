import MutRequest from './mutRequet';

export default class TargetIdleRpm implements MutRequest {
    readonly name: string = "TargetIdleRpm";
    readonly nameShort: string = "TargetIdleRpm";
    readonly requestId: number = 0x24;
    readonly unitStr: string = "rpm";
    readonly min: number = 0;
    readonly max: number = 8000;

    eval(x: number): number {
        return 7.8*x;
    }
}