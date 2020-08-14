const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const jwtConfig = require('../config/jwt.config');
const createError = require('http-errors');

module.exports.authenticate = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).then((user) => {
        if (!user) return next(createError(403, 'user not exist'));

        user.comparePassword(req.body.password).then(async (isMatch) => {
            if (!isMatch) return next(createError(403, 'incorrect password'));

            res.json(await authResponseObj(user));
        });
    });
};

module.exports.refreshToken = (req, res, next) => {
    User.findOne({username: req.body.username}).then((user) => {
        if(!user) return next(createError(404, 'User not found'));

        RefreshToken.findOne({userId: user._id, token: req.body.refreshToken}).then(async (refreshToken) => {
            if(!refreshToken || refreshToken.expirationDate < new Date()) {
                return next(createError(401, 'refresh token invalid'));
            }

            res.json(await authResponseObj(user));
        });
    });
};

async function authResponseObj(user) {
    delete user.password;
    const jwtToken = jwtConfig.generateJwt(user);
    const refreshToken = await RefreshToken.generateToken(user._id, jwtToken.expirationDate);

    return {
        user: user,
        token: jwtToken.token,
        tokenExpired: jwtToken.expirationDate,
        refreshToken: refreshToken.token,
        refreshTokenExpired: refreshToken.expirationDate
    }
}