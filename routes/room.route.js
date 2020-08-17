const express = require('express');
const roomCtrl = require('./../controllers/room.controller');
const validators = require('./validation/room.validation');
const jwt = require('../config/jwt.config');
const roles = require('../utils/roles.type');

const router = express.Router();

/* POST create room */
router.post('/',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    validators.roomNameQuery,
    roomCtrl.crateRoom);

/* GET room list */
router.get('/',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    roomCtrl.getRoomList);

/* GET device by id */
router.get('/:roomId',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    roomCtrl.getRoomById);

/*  PUT update room name */
router.put('/:roomId',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    validators.roomNameQuery,
    roomCtrl.updateRoom);

/*  DELETE room by id */
router.delete('/:roomId',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    roomCtrl.deleteRoom);

/** Load user when API with roomId route parameter is hit */
router.param('roomId', roomCtrl.load);

module.exports = router;