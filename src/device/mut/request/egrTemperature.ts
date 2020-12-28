import MutRequest from './mutRequet';

export default class EgrTemperature implements MutRequest {
    readonly name: string = "EgrTemperature";
    readonly nameShort: string = "EgrTemp";
    readonly requestId: number = 0x12;
    readonly unitStr: string = "℃";
    readonly min: number = 0;
    readonly max: number = 300;

    eval(x: number): number {
        return (-2.7*x + 597.7)-32*5/9;
    }
}