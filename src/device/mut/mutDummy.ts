import MutRequet from './request/mutRequet';
import {MutResult} from './mutClient';
import { msleep } from "sleep";

class Mut {

    deviceCount: MutResult;

    constructor(vendorId: number, productId: number) {
        this.deviceCount = {
            value: 1,
            status: 'OK',
            isSuccess: true
        };
    }

    open(index: number): MutResult {
        msleep(2000);
        return {
            value: 0,
            status: 'OK',
            isSuccess: true
        };
    }

    close() {
        // NOP
    }

    request(request: MutRequet): MutResult {
        msleep(50);
        return {
            value: Math.floor(Math.random() * 0xFF),
            status: 'OK',
            isSuccess: true
        };
    }
}

module.exports = Mut;