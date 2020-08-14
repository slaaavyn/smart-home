const express = require('express');
const userCtrl = require('../controllers/user.controller');
const validators = require('./validation/user.validation');
const jwt = require('../config/jwt.config');
const roles = require('../utils/roles.type');

const router = express.Router();

/**
 * @api {get} /api/user List all users
 * @apiName GetUserList
 * @apiGroup User
 * @apiPermission ROLE_ADMIN
 *
 * @apiUse AuthorizationHeader
 *
 * @apiSuccess {Object[]} users List of users
 * @apiSuccess {String} users._id ID of the user
 * @apiSuccess {String} users.username Username of the user
 * @apiSuccess {String} users.firstName FirstName of the user
 * @apiSuccess {String} users.lastName LastName of the user
 * @apiSuccess {String} users.role Role of the user
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *     [
 *       {
 *        "_id":
 *        "username": "a_user",
 *        "firstName": "Anton"
 *        "lastName": "Gusev"
 *        "role": "ROLE_ADMIN"
 *       },
 *       {
 *        "_id":
 *        "username": "b_user",
 *        "firstName": "Viktor"
 *        "lastName": "Lindeman"
 *        "role": "ROLE_USER"
 *       }
 *     ]
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 **/
router.get('/',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    userCtrl.getUserList);

/**
 * @api {post} /api/user/create Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission ROLE_ADMIN
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam  {String} username Username for the user
 * @apiParam  {String} password Password for the user
 * @apiParam  {String} firstName FirstName for the user
 * @apiParam  {String} lastName LastName for the user
 * @apiParam  {string="ROLE_ADMIN","ROLE_USER","ROLE_DEVICE"} role Role for the user
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "root",
 *       "password": "toor",
 *       "firstName": "admin",
 *       "lastName": "admin",
 *       "role": "ROLE_ADMIN"
 *     }
 *
 * @apiSuccess {Object} user User
 * @apiSuccess {String} user._id ID of the user
 * @apiSuccess {String} user.username Username of the user
 * @apiSuccess {String} user.firstName FirstName of the user
 * @apiSuccess {String} user.lastName LastName of the user
 * @apiSuccess {String} user.role Role of the user
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *       {
 *        "_id":
 *        "username": "user",
 *        "firstName": "Anton"
 *        "lastName": "Gusev"
 *        "role": "ROLE_ADMIN"
 *       }
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 * @apiUse ConflictError
 **/
router.post('/create',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    validators.createUser,
    userCtrl.create);

/**
 * @api {post} /api/user/update-password Update user password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiPermission any roles
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam  {String} oldPassword Current user password
 * @apiParam  {String} newPassword New password for the user
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "oldPassword": "toor",
 *       "newPassword": "newToor"
 *     }
 *
 * @apiSuccess {Object} user User
 * @apiSuccess {String} user._id ID of the user
 * @apiSuccess {String} user.username Username of the user
 * @apiSuccess {String} user.firstName FirstName of the user
 * @apiSuccess {String} user.lastName LastName of the user
 * @apiSuccess {String} user.role Role of the user
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *       {
 *        "_id":
 *        "username": "user",
 *        "firstName": "Anton"
 *        "lastName": "Gusev"
 *        "role": "ROLE_ADMIN"
 *       }
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 * @apiUse BadRequestError
 **/
router.post('/update-password',
    [jwt.checkJwt],
    validators.updatePassword,
    userCtrl.changeUserPassword);

/**
 * @api {post} /api/user/:userId Get user by id
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission ROLE_ADMIN
 *
 * @apiUse AuthorizationHeader
 *
 * @apiSuccess {Object} user User
 * @apiSuccess {String} user._id ID of the user
 * @apiSuccess {String} user.username Username of the user
 * @apiSuccess {String} user.firstName FirstName of the user
 * @apiSuccess {String} user.lastName LastName of the user
 * @apiSuccess {String} user.role Role of the user
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *       {
 *        "_id":
 *        "username": "user",
 *        "firstName": "Anton"
 *        "lastName": "Gusev"
 *        "role": "ROLE_ADMIN"
 *       }
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 **/
router.get('/:userId',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    userCtrl.getUserById);

/**
 * @api {put} /api/user/:userId Update user by id
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission ROLE_ADMIN
 *
 * @apiUse AuthorizationHeader
 *
 * @apiParam  {String} [firstName] FirstName for the user
 * @apiParam  {String} [lastName] LastName for the user
 * @apiParam  {string="ROLE_ADMIN","ROLE_USER","ROLE_DEVICE"} [role] Role for the user
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "firstName": "newFirstName",
 *       "lastName": "newLastName",
 *       "role": "ROLE_ADMIN"
 *     }
 *
 * @apiSuccess {Object} user User
 * @apiSuccess {String} user._id ID of the user
 * @apiSuccess {String} user.username Username of the user
 * @apiSuccess {String} user.firstName FirstName of the user
 * @apiSuccess {String} user.lastName LastName of the user
 * @apiSuccess {String} user.role Role of the user
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *       {
 *        "_id":
 *        "username": "user",
 *        "firstName": "Anton"
 *        "lastName": "Gusev"
 *        "role": "ROLE_ADMIN"
 *       }
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 * @apiUse BadRequestError
 **/
router.put('/:userId',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    userCtrl.updateUser);

/**
 * @api {delete} /api/user/:userId Delete user by id
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission ROLE_ADMIN
 *
 * @apiUse AuthorizationHeader
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *
 * @apiUse NotAuthorizedError
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 **/
router.delete('/:userId',
    [jwt.checkJwt, jwt.checkUserRole([roles.ROLE_ADMIN])],
    userCtrl.removeUserById);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
