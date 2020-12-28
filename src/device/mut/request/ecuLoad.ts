import MutRequest from './mutRequet';

export default class EcuLoad implements MutRequest {
    readonly name: string = "EcuLoad";
    readonly nameShort: string = "EcuLoad";
    readonly requestId: number = 0x1C;
    readonly unitStr: string = "/160";
    readonly min: number = 0;
    readonly max: number = 160;

    eval(x: number): number {
        return 5*x/8;
    }
}