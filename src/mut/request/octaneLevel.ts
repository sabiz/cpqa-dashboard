import type MutRequest from './mutRequest';

export default class OctaneLevel implements MutRequest {
    readonly name: string = "OctaneLevel";
    readonly nameShort: string = "OctaneLevel";
    readonly requestId: number = 0x27;
    readonly unitStr: string = "%";
    readonly min: number = 0;
    readonly max: number = 100;

    eval(x: number): number {
        return 100*x/255;
    }
}