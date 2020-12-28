export default interface MutRequest {
    readonly name: string;
    readonly nameShort: string;
    readonly requestId: number;
    readonly unitStr: string;
    readonly min: number;
    readonly max: number;

    eval(x: number): number;

}