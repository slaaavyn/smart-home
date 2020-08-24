const Device = require('../models/device.model');

// uid list of online devices
const onlineDevices = new Set();

module.exports.connect = async (deviceObj) => {
    if(!deviceObj || !deviceObj.uid) return;

    let device;
    if(await Device.isDeviceExist(deviceObj.uid)) {
        device = await Device.getDeviceByUId(deviceObj.uid);
        device.components = deviceObj.components;
    } else {
        device = Device.create(deviceObj);
    }

    return await device.save().then((d) => {
        onlineDevices.add(device.uid);
        delete d._schema;
        return d;
    });
}

module.exports.disconnect = (deviceUid) => {
    onlineDevices.delete(deviceUid);
}

module.exports.isDeviceOnline = (deviceUid) => {
    return onlineDevices.has(deviceUid);
}