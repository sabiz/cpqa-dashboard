import MutDevice, {MutRequests} from './device/mut/mutDevice';
import log from './util/log';


const mutDevice = new MutDevice();

if(!MutDevice.exist()) {
    console.log("No device");
    process.exit(0);
}

let tryCount = 0
while(true) {
    const result = mutDevice.tryOpen(0);
    tryCount += 1;
    if(result || tryCount > 10) {
        break;
    }
}

for(let i = 0; i < 255; i++) {

    process.stdout.write(`${MutRequests.ThrottlePosition.name}:\t ${mutDevice.request(MutRequests.ThrottlePosition)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.EngineRpm.name}:\t ${mutDevice.request(MutRequests.EngineRpm)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.CoolantTemperature.name}:\t ${mutDevice.request(MutRequests.CoolantTemperature)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.EcuLoad.name}:\t ${mutDevice.request(MutRequests.EcuLoad)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.FuelConsumption.name}:\t ${mutDevice.request(MutRequests.FuelConsumption)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.Boost.name}:\t ${mutDevice.request(MutRequests.Boost)}`);
    process.stdout.write('\n');
    process.stdout.write(`${MutRequests.BatteryLevel.name}:\t ${mutDevice.request(MutRequests.BatteryLevel)}`);
    process.stdout.write('\x1b[6A\r');
}

process.stdout.write('\x1b[6B\n');
mutDevice.close();
console.log("DONE");