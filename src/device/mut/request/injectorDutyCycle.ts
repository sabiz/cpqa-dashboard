import MutRequest from './mutRequet';
import MultiRequest from './multiRequest';
import InjectorPulseWidth from './injectorPulseWidth';

export default class InjectorDutyCycle implements MutRequest, MultiRequest {
    readonly name: string = "InjectorDutyCycle";
    readonly nameShort: string = "InjDutyCycle";
    readonly requestId: number = 0x21;
    readonly unitStr: string = "%";
    readonly min: number = 0;
    readonly max: number = 160;

    readonly subRequests: Array<MutRequest> = [new InjectorPulseWidth()];
    subValues: Array<number> = [0];

    eval(x: number): number {
        return this.subValues[0]*31.25*x/1200;
    }
}