import MutClient, {MutRequests} from './device/mut/mutClient';
import logger from './common/log';
const l = logger("APP");
l.verbose("Start");

const mutClient = new MutClient();
if(!mutClient.existDevice()) {
    l.info("No Device");
    process.exit(0);
}

let tryCount = 0
while(true) {
    const result = mutClient.open(0);
    tryCount += 1;
    if(result || tryCount > 10) {
        break;
    }
}

for(let i = 0; i < 5 && tryCount < 100 ; i++) {

    process.stdout.write(`${MutRequests.ThrottlePosition.name}:\t ${mutClient.request(MutRequests.ThrottlePosition)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.EngineRpm.name}:\t ${mutClient.request(MutRequests.EngineRpm)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.CoolantTemperature.name}:\t ${mutClient.request(MutRequests.CoolantTemperature)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.EcuLoad.name}:\t ${mutClient.request(MutRequests.EcuLoad)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.FuelConsumption.name}:\t ${mutClient.request(MutRequests.FuelConsumption)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.Boost.name}:\t ${mutClient.request(MutRequests.Boost)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.BatteryLevel.name}:\t ${mutClient.request(MutRequests.BatteryLevel)}`);
    process.stdout.write('\x1b[6A\r');
}

process.stdout.write('\x1b[6B\n');
mutClient.close();
l.verbose("Done");