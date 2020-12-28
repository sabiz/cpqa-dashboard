import MutRequest from './mutRequet';

export default class OxygenFeedbackTrim implements MutRequest {
    readonly name: string = "OxygenFeedbackTrim";
    readonly nameShort: string = "O2FeedbackTrim";
    readonly requestId: number = 0x0F;
    readonly unitStr: string = "%";
    readonly min: number = 0;
    readonly max: number = 200;

    eval(x: number): number {
        return (0.1961*x)-25; // 0.78125 * x  ?
    }
}