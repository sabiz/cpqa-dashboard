import MutRequest from './mutRequet';

export default class AirFlowHz implements MutRequest {
    readonly name: string = "AirFlowHz";
    readonly nameShort: string = "AirFlow";
    readonly requestId: number = 0x1A;
    readonly unitStr: string = "Hz";
    readonly min: number = 0;
    readonly max: number = 1650;

    eval(x: number): number {
        return 6.25*x;
    }
}