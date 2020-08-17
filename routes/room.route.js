const express = require('express');
const roomCtrl = require('./../controllers/room.controller');
const validators = require('./validation/room.validation');
const jwt = require('../config/jwt.config');
const roles = require('../utils/roles.type');

const router = express.Router();

/**
 * @api {post} /api/room?roomName=Main Create room
 * @apiName CreateRoom
 * @apiGroup Room
 * @apiPermission ROLE_ADMIN
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam  {String} roomName Name for the room
 *
 * @apiSuccess {Object} room Room
 * @apiSuccess {String} room._id ID of the room
 * @apiSuccess {String} room.name name of the room
 * @apiSuccess {Object[]} room.devices List of devices in room
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *       {
 *        "_id":
 *        "name": "Main",
 *        "devices": []
 *       }
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 * @apiUse ConflictError
 **/
router.post('/',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    validators.roomNameQuery,
    roomCtrl.crateRoom);

/**
 * @api {get} /api/room List all rooms
 * @apiName GetRoomLst
 * @apiGroup Room
 * @apiPermission [ROLE_ADMIN, ROLE_USER]
 *
 * @apiUse AuthorizationHeader
 *
 * @apiSuccess {Object[]} rooms List of rooms
 * @apiSuccess {Object} rooms.room Room
 * @apiSuccess {String} rooms.room._id ID of the room
 * @apiSuccess {String} rooms.name name of the room
 * @apiSuccess {Object[]} rooms.room.devices List of devices in room
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *     [
 *       {
 *        "_id":
 *        "name": "a_room",
 *        "devices": []
 *       },
 *       {
 *        "_id":
 *        "username": "b_room",
 *        "devices": []
 *       }
 *     ]
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 **/
router.get('/',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN, roles.ROLE_USER])],
    roomCtrl.getRoomList);

/**
 * @api {get} /api/room/:roomId Get device by id
 * @apiName GetRoom
 * @apiGroup Room
 * @apiPermission [ROLE_ADMIN, ROLE_USER]
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam  {String} roomId Room unique ID
 *
 * @apiSuccess {Object} room Room
 * @apiSuccess {String} room._id ID of the room
 * @apiSuccess {String} name name of the room
 * @apiSuccess {Object[]} room.devices List of devices in room
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *     {
 *      "_id":
 *      "name": "a_room",
 *      "devices": []
 *     }
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 **/
router.get('/:roomId',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN, roles.ROLE_USER])],
    roomCtrl.getRoomById);

/**
 * @api {put} /api/room/:roomId?roomName=newName Update room name
 * @apiName UpdateRoom
 * @apiGroup Room
 * @apiPermission ROLE_ADMIN
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam  {String} roomId Room unique ID
 * @apiParam  {String} roomName Name for the room
 *
 * @apiSuccess {Object} room Room
 * @apiSuccess {String} room._id ID of the room
 * @apiSuccess {String} room.name name of the room
 * @apiSuccess {Object[]} room.devices List of devices in room
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *       {
 *        "_id":
 *        "name": "newName",
 *        "devices": []
 *       }
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 * @apiUse ConflictError
 **/
router.put('/:roomId',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    validators.roomNameQuery,
    roomCtrl.updateRoom);

/**
 * @api {delete} /api/room/:roomId Delete room by id
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission ROLE_ADMIN
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam  {String} roomId Room unique ID
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 **/
router.delete('/:roomId',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    roomCtrl.deleteRoom);

/** Load user when API with roomId route parameter is hit */
router.param('roomId', roomCtrl.load);

module.exports = router;