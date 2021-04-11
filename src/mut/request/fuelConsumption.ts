import type MutRequest from './mutRequest';
import type MultiRequest from './multiRequest';
import InjectorPulseWidth from './injectorPulseWidth';
import Speed from './speed';

export default class FuelConsumption implements MutRequest, MultiRequest {
    readonly name: string = "FuelConsumption";
    readonly nameShort: string = "FuelConsumption";
    readonly requestId: number = 0x21;
    readonly unitStr: string = "km/L";
    readonly min: number = 0;
    readonly max: number = 50;
    readonly HISTORY_LENGTH = 100;

    readonly subRequests: Array<MutRequest> = [new InjectorPulseWidth(), new Speed()];
    subValues: Array<number> = [0, 0];
    evalHistory: Array<number> = [];
    lastValue: number = 0;

    eval(x: number): number {
        if (this.subValues[1] == 0) {
            return this.lastValue;
        }
        const tmp = 31.25*x*this.subValues[0]*20*6/this.subValues[1]/1200;
        if(tmp <= 0) {
            return this.lastValue;
        }
        this.lastValue = this.calcMean(100/tmp);
        return this.lastValue;
    }

    private calcMean(value:number):number {
        this.evalHistory.push(value);
        if(this.evalHistory.length > this.HISTORY_LENGTH) {
            this.evalHistory.shift();
        }
        const sum = this.evalHistory.reduce((p,v) => p+v);
        return sum/this.evalHistory.length;
    }
}