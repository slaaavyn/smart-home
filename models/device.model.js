const Document = require('camo').Document;

class Device extends Document {
    constructor() {
        super();

        this.uid = {
            type: String,
            required: true,
            unique: true
        };

        this.description = {
            type: String,
            required: false,
            unique: false
        };

        this.roomId = {
            type: String,
            required: false,
            unique: false
        };

        this.roomName = {
            type: String,
            required: false,
            unique: false
        };

        this.components = {
            type: [],
            required: false
        };
    }

    static collectionName() {
        return 'devices';
    }

    static async getDeviceById(id) {
        return await Device.findOne({_id: id});
    }

    static async isDeviceExist(deviceId) {
        return !!(await Device.findOne({deviceId}));
    }
}

module.exports = Device;