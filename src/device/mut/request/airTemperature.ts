import MutRequest from './mutRequet';

export default class AirTemperature implements MutRequest {
    readonly name: string = "AirTemperature";
    readonly nameShort: string = "AirTemp";
    readonly requestId: number = 0x3A;
    readonly unitStr: string = "C";
    readonly min: number = 0;
    readonly max: number = 190;

    eval(x: number): number {
        return x;
    }
}