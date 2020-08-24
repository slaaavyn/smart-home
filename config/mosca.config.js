const mosca = require('mosca');
const User = require('../models/user.model');
const deviceService = require('../services/device.service');

const port = 1883;

const server = new mosca.Server({port}, null);

server.on('ready', () => {
    console.log('MQTT broker running on port: ' + port);
    server.authenticate = authenticate;
});

/*server.on('clientConnected', (client) => {
    console.log('client connected', client.id);
});*/

server.on('clientDisconnected', (client) => {
    deviceService.disconnect(client.id);
});

server.on('published', (packet, client) => {

    // receive data from device, update in db and send to client
    if(packet.topic === 'device/state') {
        const deviceObj = JSON.parse(packet.payload.toString());
        deviceService.connect(deviceObj).then((device) => {
            publishDevice(device);
        });
    }
});

function authenticate(client, username, password, callback) {
    if(!username || !password) return callback(null, false);

    User.findOne({
        username: username
    }).then((user) => {
        if (!user) return callback(null, false);

        user.comparePassword(password.toString('ascii')).then(async (isMatch) => {
            if (!isMatch) return callback(null, false);

            return callback(null, true);
        });
    });
}

function publishDevice(deviceObj) {
    server.publish({
        topic: 'device',
        payload: Buffer.from(JSON.stringify(deviceObj)),
        qos: 1
    }, null,() => {});
}

module.exports = server;