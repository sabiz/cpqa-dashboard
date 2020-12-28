import MutRequest from './mutRequet';

export default class Speed implements MutRequest {
    readonly name: string = "Speed";
    readonly nameShort: string = "Speed";
    readonly requestId: number = 0x2F;
    readonly unitStr: string = "km/h";
    readonly min: number = 0;
    readonly max: number = 280;

    eval(x: number): number {
        return 2*x;
    }
}