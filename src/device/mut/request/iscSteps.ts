import MutRequest from './mutRequet';

export default class IscSteps implements MutRequest {
    readonly name: string = "IscSteps";
    readonly nameShort: string = "IscSteps";
    readonly requestId: number = 0x16;
    readonly unitStr: string = "steps";
    readonly min: number = 0;
    readonly max: number = 255;

    eval(x: number): number {
        return x;
    }
}