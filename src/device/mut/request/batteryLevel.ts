import MutRequest from './mutRequet';

export default class BatteryLevel implements MutRequest {
    readonly name: string = "BatteryLevel";
    readonly nameShort: string = "Battery";
    readonly requestId: number = 0x14;
    readonly unitStr: string = "V";
    readonly min: number = 0;
    readonly max: number = 16;

    eval(x: number): number {
        return 0.07333*x;
    }
}