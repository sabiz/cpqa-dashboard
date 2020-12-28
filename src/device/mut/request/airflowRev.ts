import MutRequest from './mutRequet';

export default class AirflowRev implements MutRequest {
    readonly name: string = "AirflowRev";
    readonly nameShort: string = "AccelEnrich";
    readonly requestId: number = 0x1D;
    readonly unitStr: string = "load";
    readonly min: number = 0;
    readonly max: number = 300;

    eval(x: number): number {
        return 200*x/255;
    }
}