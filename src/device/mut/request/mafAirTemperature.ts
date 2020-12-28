import MutRequest from './mutRequet';

export default class MafAirTemperature implements MutRequest {
    readonly name: string = "MafAirTemperature";
    readonly nameShort: string = "MafAirTemp";
    readonly requestId: number = 0x11;
    readonly unitStr: string = "℃";
    readonly min: number = -40;
    readonly max: number = 260;

    eval(x: number): number {
        return x-40;
    }
}