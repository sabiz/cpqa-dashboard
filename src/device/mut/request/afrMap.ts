import MutRequest from './mutRequet';

export default class AfrMap implements MutRequest {
    readonly name: string = "AfrMap";
    readonly nameShort: string = "AfrMap";
    readonly requestId: number = 0x32;
    readonly unitStr: string = "AFR";
    readonly min: number = 0;
    readonly max: number = 255;

    eval(x: number): number {
        return (14.7*128)/x;
    }
}