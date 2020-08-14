const express = require('express');
const authCtrl = require('./../controllers/auth.controller');
const userRoutes = require('./user.route');

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
 *     }
 *
 * @apiUse InternalServerError
 * @apiUse NotFoundError
 * @apiUse BadRequestError
 **/
router.post('/auth', authCtrl.authenticate);

router.use('/user', userRoutes);

module.exports = router;
