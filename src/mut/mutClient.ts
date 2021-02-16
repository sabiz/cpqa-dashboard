/* eslint @typescript-eslint/no-unsafe-member-access: 0, @typescript-eslint/no-unsafe-call: 0 */

import type MutRequest from './request/mutRequest';
import type MutResult from './request/mutResult';
import {confDevice} from '../common/conf';
import getLogger from '../common/log';
const log = getLogger('MUT');


const {Mut} = require('bindings')('Mut');
// For DEBUG
// import {Mut} from './mutDummy';


import AfrMap from './request/afrMap';
import AirConditioningRelay from './request/airConditioningRelay';
import AirConditioningSwitch from './request/airConditioningSwitch';
import AirFlowHz from './request/airFlowHz';
import AirTemperature from './request/airTemperature';
import AirVolume from './request/airVolume';
import AirflowRev from './request/airflowRev';
import Barometer from './request/barometer';
import BatteryLevel from './request/batteryLevel';
import Boost from './request/boost';
import CoolantTemperature from './request/coolantTemperature';
import CrankSignalSwitch from './request/crankSignalSwitch';
import EcuLoad from './request/ecuLoad';
import EgrTemperature from './request/egrTemperature';
import EngineRpm from './request/engineRpm';
import FuelConsumption from './request/fuelConsumption';
import FuelTrimHigh from './request/fuelTrimHigh';
import FuelTrimLow from './request/fuelTrimLow';
import FuelTrimMid from './request/fuelTrimMid';
import Gear from './request/gear';
import IdlePositionSwitch from './request/idlePositionSwitch';
import InhibitorSwitch from './request/inhibitorSwitch';
import InjectorDutyCycle from './request/injectorDutyCycle';
import InjectorLatency from './request/injectorLatency';
import InjectorPulseWidth from './request/injectorPulseWidth';
import IscSteps from './request/iscSteps';
import KnockSum from './request/knockSum';
import KnockVoltage from './request/knockVoltage';
import LoadError from './request/loadError';
import MafAirTemperature from './request/mafAirTemperature';
import {isMultiRequest} from './request/multiRequest';
import OctaneLevel from './request/octaneLevel';
import OxygenFeedbackTrim from './request/oxygenFeedbackTrim';
import OxygenSensor from './request/oxygenSensor';
import OxygenSensor2 from './request/oxygenSensor2';
import PowerSteeringSwitch from './request/powerSteeringSwitch';
import Speed from './request/speed';
import TargetIdleRpm from './request/targetIdleRpm';
import ThrottlePosition from './request/throttlePosition';
import TimingAdvance from './request/timingAdvance';
import WastegateDutyCycle from './request/wastegateDutyCycle';
import WastegateDutyCycleCorrection from './request/wastegateDutyCycleCorrection';

export const MutRequests = {
    AfrMap: new AfrMap(),
    AirConditioningRelay: new AirConditioningRelay(),
    AirConditioningSwitch: new AirConditioningSwitch(),
    AirFlowHz: new AirFlowHz(),
    AirTemperature: new AirTemperature(),
    AirVolume: new AirVolume(),
    AirflowRev: new AirflowRev(),
    Barometer: new Barometer(),
    BatteryLevel: new BatteryLevel(),
    Boost: new Boost(),
    CoolantTemperature: new CoolantTemperature(),
    CrankSignalSwitch: new CrankSignalSwitch(),
    EcuLoad: new EcuLoad(),
    EgrTemperature: new EgrTemperature(),
    EngineRpm: new EngineRpm(),
    FuelConsumption: new FuelConsumption(),
    FuelTrimHigh: new FuelTrimHigh(),
    FuelTrimLow: new FuelTrimLow(),
    FuelTrimMid: new FuelTrimMid(),
    Gear: new Gear(),
    IdlePositionSwitch: new IdlePositionSwitch(),
    InhibitorSwitch: new InhibitorSwitch(),
    InjectorDutyCycle: new InjectorDutyCycle(),
    InjectorLatency: new InjectorLatency(),
    InjectorPulseWidth: new InjectorPulseWidth(),
    IscSteps: new IscSteps(),
    KnockSum: new KnockSum(),
    KnockVoltage: new KnockVoltage(),
    LoadError: new LoadError(),
    MafAirTemperature: new MafAirTemperature(),
    OctaneLevel: new OctaneLevel(),
    OxygenFeedbackTrim: new OxygenFeedbackTrim(),
    OxygenSensor: new OxygenSensor(),
    OxygenSensor2: new OxygenSensor2(),
    PowerSteeringSwitch: new PowerSteeringSwitch(),
    Speed: new Speed(),
    TargetIdleRpm: new TargetIdleRpm(),
    ThrottlePosition: new ThrottlePosition(),
    TimingAdvance: new TimingAdvance(),
    WastegateDutyCycle: new WastegateDutyCycle(),
    WastegateDutyCycleCorrection: new WastegateDutyCycleCorrection(),
};

export default class MutClient {

    private static MAX_HISTORY_COUNT = 25;
    private static MIN_HISTORY_COUNT = 5;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mut: any;
    requestHistory: Number[]

    constructor() {
        const vendorId = confDevice.vendorId;
        const productId = confDevice.productId;
        this.mut = new Mut(vendorId, productId, this.logFromNative);
        this.requestHistory = new Array<Number>();
    }

    open(index: number): boolean {
        const result = this.mut.open(index) as MutResult;
        log.verbose(`open : ${JSON.stringify(result)}`);
        return result.isSuccess;
    }

    close():void {
        this.mut.close();
        log.verbose("closed");
    }

    request(request: MutRequest):number|null {
        const result = this.mut.request(request.requestId) as MutResult;
        if(!result.isSuccess) {
            log.warning(`request failed: ${JSON.stringify(result)}`);
            return 0;
        }

        const multi = isMultiRequest(request);
        if(multi) {
            log.verbose("multi request");
            for(let i = 0; i< multi.subRequests.length; i++) {
                const tmp = this.request(multi.subRequests[i]);
                if(tmp === undefined) {
                    return 0;
                }
                multi.subValues[i] = tmp;
            }
        }
        const resultValue = request.eval(result.value);
        log.verbose(`MutRequest(${request.nameShort}):\t ${resultValue}`);

        const hasCon = this.hasMutConnection(result.value);

        if(!hasCon) {
            return null;
        }
        return resultValue;
    }

    existDevice(): boolean {
        const result =this.mut.deviceCount as MutResult;
        return (result.value as number > 0);
    }

    private hasMutConnection(value: Number):boolean {
        /**
         * [Checking connection]
         * 
         * If the connection is lost,
         * response will be same regardless of MUT request.
         */

         this.requestHistory.push(value);

         if(this.requestHistory.length < MutClient.MIN_HISTORY_COUNT) {
             return true;
         }

         if(this.requestHistory.length > MutClient.MAX_HISTORY_COUNT) {
             this.requestHistory.shift();
         }

         const uniqValues = Array.from(new Set(this.requestHistory));

         return uniqValues.length !== 1;

    }

    private logFromNative(level: number, msg: string) {
        let func = log.verbose;
        switch(level) {
        case 1:
            func = log.info;
            break;
        case 2:
            func = log.warning;
            break;
        case 3:
            func = log.error;
            break;
        }
        func("[NATIVE]: " + msg);
    }
}