import type MutRequest from './mutRequest';
import type MultiRequest from './multiRequest';
import Speed from './speed';

export default class Gear implements MutRequest, MultiRequest {
    readonly name: string = "Gear";
    readonly nameShort: string = "Gear";
    readonly requestId: number = 0x21;
    readonly unitStr: string = "";
    readonly min: number = 0;
    readonly max: number = 255;

    readonly subRequests: Array<MutRequest> = [new Speed()];
    subValues: Array<number> = [0];

    eval(x: number): number {
        if(this.subValues[0]==0) {
            return 0;
        }
        return x/this.subValues[0];
    }
}