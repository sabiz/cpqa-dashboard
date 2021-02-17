/* eslint @typescript-eslint/no-unused-vars: 0 */
import { msleep } from "sleep";
import type MutRequest from './request/mutRequest';
import type MutResult from './request/mutResult';

export class Mut{

    deviceCount: MutResult;

    constructor(vendorId: number, productId: number, logFunc: Function) {
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

    close():void {
        // NOP
    }

    request(request: MutRequest): MutResult {
        msleep(50);
        return {
            value: Math.floor(Math.random() * 0xFF),
            status: 'OK',
            isSuccess: true
        };
    }
}