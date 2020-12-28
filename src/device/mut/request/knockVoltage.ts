import MutRequest from './mutRequet';

export default class KnockVoltage implements MutRequest {
    readonly name: string = "KnockVoltage";
    readonly nameShort: string = "Knock";
    readonly requestId: number = 0x30;
    readonly unitStr: string = "V";
    readonly min: number = 0;
    readonly max: number = 50;

    eval(x: number): number {
        return 0.0195*x;
    }
}