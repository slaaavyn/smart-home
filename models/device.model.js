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

    static async getDeviceByUId(uid) {
        return await Device.findOne({uid: uid});
    }

    static async isDeviceExist(uid) {
        return !!(await Device.findOne({uid}));
    }
}

module.exports = Device;