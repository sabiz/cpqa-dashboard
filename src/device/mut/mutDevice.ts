import D2XX from "../FTD2XX/d2xx";
import MutRequet from "./request/mutRequet";
import { msleep } from "sleep";

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

export default class MutDevice {


    private d2xx: D2XX;

    constructor() {
        this.d2xx = new D2XX();
    }

    request(mutRequest: MutRequet): number | void {
        const result = this.d2xx.writeByte(mutRequest.requestId);
        if(!result[0]) {
            return;
        }
        const buffResult = this.d2xx.readBuffer(2);
        if(!buffResult[0]) {
            return;
        }
        msleep(10);
        const multi = isMultiRequest(mutRequest)
        if(multi) {
            for(let i = 0; i< multi.subRequests.length; i++) {
                const tmp = this.request(multi.subRequests[i]);
                if(tmp === undefined) {
                    return;
                }
                multi.subValues[i] = tmp;
            }
        }
        return mutRequest.eval((buffResult[1] as Buffer)[1]);
    }

    close(): void {
        this.d2xx.close();
    }

    tryOpen(deviceIndex: number): boolean {
        let result = this.d2xx.open(deviceIndex);
        if (!result) {
            return false;
        }
        result = this.d2xx.purge(D2XX.PURGE_ALL);
        if (!result) {
            return false;
        }
        result = this.d2xx.setBaudRate(15625);
        if (!result) {
            return false;
        }
        result = this.d2xx.setDataCharacteristics(D2XX.BITS_8, D2XX.STOP_BITS_1, D2XX.PARITY_NONE);
        if (!result) {
            return false;
        }
        result = this.d2xx.setFlowControl(D2XX.FLOW_NONE, 0, 0);
        if (!result) {
            return false;
        }
        result = this.d2xx.setTimeouts(1000, 1000);
        if (!result) {
            return false;
        }

        this.d2xx.getLatencyTimer();
        result = this.d2xx.setLatencyTimer(1);
        if (!result) {
            return false;
        }

        result = this.d2xx.setDtr();
        if (!result) {
            return false;
        }
        msleep(500);
        result = this.d2xx.clearDtr();
        if (!result) {
            return false;
        }
        msleep(740);
        result = this.d2xx.setDtr();
        if (!result) {
            return false;
        }
        msleep(600);

        for(let i = 0; i < 10; i++) {
            const writeResult = this.d2xx.writeByte(0x17);
            if(!writeResult[0]) {
                return false;
            }
            let buffResult = this.d2xx.readBuffer(2);
            if(!buffResult[0]) {
                return false;
            }
            let buff = buffResult[1] as Buffer;
            if(buff[1] != 0) {
                break;
            }
            result = this.d2xx.breakOn();
            if (!result) {
                return false;
            }
            msleep(1800);
            result = this.d2xx.breakOff();
            if (!result) {
                return false;
            }
            buffResult = this.d2xx.readBuffer(4);
            if(!buffResult[0]) {
                return false;
            }
            buff = buffResult[1] as Buffer;
            if (buff[0]!=buff[1] && buff[2]!=buff[3]) {
                break;
            }
            msleep(10);
        }

        return true;
    }

    static exist(): boolean {
        const result = D2XX.getDeviceCount();
        if (result[0]) {
            return result[1] as number > 0;
        }
        return false;
    }

}
