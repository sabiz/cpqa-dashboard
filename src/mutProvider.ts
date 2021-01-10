import WebSocket, {Server as WsServer} from 'ws';
import getLog from './common/log';
import MutClient, {MutRequests} from './mut/mutClient';
import constants from './common/constants';
import {confApp} from './common/conf';
import type MutRequest from './mut/request/mutRequest';
import type MutMessage from './mut/mutMessage';

const log = getLog("WS");

interface RequestJob {
    req: MutRequest,
    interval: number
}

class MutProvider {

    private wsServer: WsServer;
    private mutClient: MutClient;
    private requestTable: Array<RequestJob>;

    constructor() {
        this.wsServer = new WsServer({ port: constants.WS_SERVER_PORT });
        this.wsServer.on("connection", () => this.onNewConnection());
        this.wsServer.on("close", () => this.onCloseConnection());
        this.mutClient = new MutClient();

        this.requestTable = confApp.displayItems.map((v) => {
            return {
                req: MutRequests[v.name] as MutRequest,
                interval: v.intervalMs
            }
        });

        setTimeout(()=>{this.initDevice()}, 300);
    }



    private onNewConnection() {
        log.verbose("New connection");
    }

    private onCloseConnection() {
        log.verbose("Close connection");
    }

    private initDevice() {
        log.verbose("Init device");
        if(!this.mutClient.existDevice()) {
            log.verbose("Device not found");
            setTimeout(()=>{this.initDevice()}, 300);
            return;
        }

        setTimeout(() => {
            const result = this.mutClient.open(0);
            if(!result) {
                log.verbose("Device open failed");
                this.initDevice();
                return;
            }
            log.info("Device init done");
            setTimeout(()=>{this.startRequest()}, 300);
        }, 300);
    }

    private onProcessMutRequest(id: number, mutRequest: MutRequest) {
        const val = this.mutClient.request(mutRequest);
        const sendData = JSON.stringify({
            id: id,
            name: mutRequest.nameShort,
            value: val,
            unit: mutRequest.unitStr
        } as MutMessage);
        this.wsServer.clients.forEach((c) => {
            if (c.readyState === WebSocket.OPEN) {
                c.send(sendData)
            }
          });
    }

    private startRequest() {
        this.requestTable.forEach((v, idx) => {
            setInterval(() => {
                this.onProcessMutRequest(idx, v.req);
            }, v.interval);
        });
    }
}

new MutProvider();
