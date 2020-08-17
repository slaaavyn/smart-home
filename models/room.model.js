const Document = require('camo').Document;

class Room extends Document {
    constructor() {
        super();

        this.name = {
            type: String,
            required: true,
            unique: true
        };

        this.deviceIdList = {
            type: [],
            required: false
        };
    }

    static collectionName() {
        return 'rooms';
    }

    static async getRoomById(id) {
        return await Room.findOne({_id: id});
    }

    static async isRoomExist(roomName) {
        return !!(await Room.findOne({roomName}));
    }
}

module.exports = Room;