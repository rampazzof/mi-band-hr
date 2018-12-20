import "@babel/polyfill";
const MiBand = require("miband");
const bluetooth = require("webbluetooth").bluetooth;
const log = console.log;

(async function main() {
    try {
        log("Requesting Bluetooth Device...");
        const device = await bluetooth.requestDevice({
            filters: [{ services: [MiBand.advertisementService] }],
            optionalServices: MiBand.optionalServices
        });

        const server = await device.gatt.connect();
        log("Device connected");
        let miband = new MiBand(server);
        await miband.init();
        log(await miband.showNotification("message"));
    } catch (err) {
        log(err);
    }
})();
