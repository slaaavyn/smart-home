const createError = require('http-errors');
const Room = require('../models/room.model');

module.exports.load = (req, res, next, id) => {
    Room.getRoomById(id)
        .then((room) => {
            if (!room) return next(createError(404, 'room not found'));

            req.room = room;
            return next();
        })
        .catch((e) => next(createError(e)));
}


module.exports.crateRoom = async (req, res, next) => {
    if (await Room.isRoomExist(req.query.roomName)) {
        return next(createError(409, `Room with name: ${req.query.roomName} already exist`));
    }

    Room.create({name: req.query.roomName, deviceIdList: []}).save()
        .then((createdRoom) => {
            res.json(roomDtoResponse(createdRoom));
        }).catch((e) => {
        return next(createError(400, e));
    });
};

module.exports.getRoomById = (req, res, next) => {
    res.json(roomDtoResponse(req.room));
};

module.exports.getRoomList = (req, res, next) => {
    Room.find({}).then((roomList) => {
        if (!roomList) return res.json([]);

        roomList.forEach(room => room = roomDtoResponse(room));
        res.json(roomList);
    });
};

module.exports.updateRoom = async (req, res, next) => {
    if (await Room.isRoomExist(req.query.roomName)) {
        return next(createError(409, `Room with name: ${req.query.roomName} already exist`));
    }

    req.room.name = req.query.roomName ? req.query.roomName : req.room.name;

    req.room.save()
        .then((room) => {
            res.json(roomDtoResponse(room));
        })
        .catch((e) => {
            return next(createError(400, e));
        });
};

module.exports.deleteRoom = (req, res, next) => {
    req.room.delete()
        .then(() => {
            res.status(200).send();
        }).catch((e) => {
            return next(createError(400, e));
        });
};

function roomDtoResponse(room) {
    if(!room.deviceIdList) room.deviceIdList = [];

    room.devices = room.deviceIdList;

    delete room.deviceIdList;
    return room;
}