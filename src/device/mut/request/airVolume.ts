import MutRequest from './mutRequet';

export default class AirVolume implements MutRequest {
    readonly name: string = "AirVolume";
    readonly nameShort: string = "AirVol";
    readonly requestId: number = 0x2C;
    readonly unitStr: string = "";
    readonly min: number = 0;
    readonly max: number = 255;

    eval(x: number): number {
        return x;
    }
}