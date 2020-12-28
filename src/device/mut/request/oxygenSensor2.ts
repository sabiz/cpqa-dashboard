import MutRequest from './mutRequet';

export default class OxygenSensor2 implements MutRequest {
    readonly name: string = "OxygenSensor2";
    readonly nameShort: string = "O2Sensor2";
    readonly requestId: number = 0x3C;
    readonly unitStr: string = "V";
    readonly min: number = 0;
    readonly max: number = 5;

    eval(x: number): number {
        return 0.01952*x;
    }
}