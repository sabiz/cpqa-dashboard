import type MutRequest from './mutRequest';
import type MultiRequest from './multiRequest';
import InjectorPulseWidth from './injectorPulseWidth';
import Speed from './speed';

export default class FuelConsumption implements MutRequest, MultiRequest {
    readonly name: string = "FuelConsumption";
    readonly nameShort: string = "FuelConsumption";
    readonly requestId: number = 0x21;
    readonly unitStr: string = "L/Km";
    readonly min: number = 0;
    readonly max: number = 50;

    readonly subRequests: Array<MutRequest> = [new InjectorPulseWidth(), new Speed()];
    subValues: Array<number> = [0, 0];

    eval(x: number): number {
        if (this.subValues[1] == 0) {
            return 0;
        }
        const tmp = x*this.subValues[0]*20*6/this.subValues[1]/1200;
        if (tmp <= 0) {
            return 0;
        }
        return 100.0/tmp;
    }
}