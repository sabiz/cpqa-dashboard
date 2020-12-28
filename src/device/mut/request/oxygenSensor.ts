import MutRequest from './mutRequet';

export default class OxygenSensor implements MutRequest {
    readonly name: string = "OxygenSensor";
    readonly nameShort: string = "O2Sensor";
    readonly requestId: number = 0x13;
    readonly unitStr: string = "V";
    readonly min: number = 0;
    readonly max: number = 5;

    eval(x: number): number {
        return 0.01952*x;
    }
}