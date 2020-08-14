const express = require('express');
const authCtrl = require('./../controllers/auth.controller');
const validators = require('./validation/auth.validation');

const router = express.Router();

/**
 * @api {post} /api/auth Authentication, generate token
 * @apiName Auth
 * @apiGroup Auth
 *
 * @apiParam  {String} username Username
 * @apiParam  {String} password Password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "root",
 *       "password": "toor"
 *     }
 *
 *
 * @apiSuccess {Object} response Root object
 * @apiSuccess {Object} response.user User
 * @apiSuccess {String} response.user._id ID of the user
 * @apiSuccess {String} response.user.username Username of the user
 * @apiSuccess {String} response.user.firstName FirstName of the user
 * @apiSuccess {String} response.user.lastName LastName of the user
 * @apiSuccess {String} response.user.role Role of the user
 * @apiSuccess {String} response.token JWT
 * @apiSuccess {String} response.tokenExpired Date when JWT expires
 * @apiSuccess {String} response.refreshToken Refresh token
 * @apiSuccess {String} response.refreshTokenExpired Date when refresh token expires
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *     {
 *       "user": {
 *        "_id":
 *        "username": "user",
 *        "firstName": "Anton"
 *        "lastName": "Gusev"
 *        "role": "ROLE_ADMIN"
 *       },
 *       "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
 *       "tokenExpired": "2020-08-15T14:19:41.459Z",
 *       "refreshToken": "ff2d9f34-971b-49d8-98a5-1964a6b52c59",
 *       "refreshTokenExpired": "2020-08-22T14:19:41.459Z"
 *     }
 *
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 * @apiUse BadRequestError
 **/
router.post('/', validators.auth, authCtrl.authenticate);

/**
 * @api {post} /api/auth/refresh-token Refresh token
 * @apiName RefreshToken
 * @apiGroup Auth
 *
 * @apiParam  {String} username Username
 * @apiParam  {String} refreshToken Refresh token
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "root",
 *       "password": "ff2d9f34-971b-49d8-98a5-1964a6b52c59"
 *     }
 *
 *
 * @apiSuccess {Object} response Root object
 * @apiSuccess {Object} response.user User
 * @apiSuccess {String} response.user._id ID of the user
 * @apiSuccess {String} response.user.username Username of the user
 * @apiSuccess {String} response.user.firstName FirstName of the user
 * @apiSuccess {String} response.user.lastName LastName of the user
 * @apiSuccess {String} response.user.role Role of the user
 * @apiSuccess {String} response.token JWT
 * @apiSuccess {String} response.tokenExpired Date when JWT expires
 * @apiSuccess {String} response.refreshToken Refresh token
 * @apiSuccess {String} response.refreshTokenExpired Date when refresh token expires
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 Success
 *     {
 *       "user": {
 *        "_id":
 *        "username": "user",
 *        "firstName": "Anton"
 *        "lastName": "Gusev"
 *        "role": "ROLE_ADMIN"
 *       },
 *       "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
 *       "tokenExpired": "2020-08-15T14:19:41.459Z",
 *       "refreshToken": "ff2d9f34-971b-49d8-98a5-1964a6b52c59",
 *       "refreshTokenExpired": "2020-08-22T14:19:41.459Z"
 *     }
 *
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 * @apiUse BadRequestError
 **/
router.post('/refresh-token', validators.refreshToken, authCtrl.refreshToken);

module.exports = router;
