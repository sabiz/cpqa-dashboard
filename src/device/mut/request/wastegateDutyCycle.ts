import MutRequest from './mutRequet';

export default class WastegateDutyCycle implements MutRequest {
    readonly name: string = "WastegateDutyCycle";
    readonly nameShort: string = "WastegateDutyCycle";
    readonly requestId: number = 0x86;
    readonly unitStr: string = "%";
    readonly min: number = 0;
    readonly max: number = 100;

    eval(x: number): number {
        return x/2;
    }
}