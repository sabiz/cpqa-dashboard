import MutRequest from './mutRequet';

export default class WastegateDutyCycleCorrection implements MutRequest {
    readonly name: string = "WastegateDutyCycleCorrection";
    readonly nameShort: string = "WGDCCorr";
    readonly requestId: number = 0x8B;
    readonly unitStr: string = "%";
    readonly min: number = -50;
    readonly max: number = 50;

    eval(x: number): number {
        return 0.5*x-64;
    }
}