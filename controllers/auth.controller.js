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

            delete user.password;
            const jwtToken = jwtConfig.generateJwt(user);
            const refreshToken = await RefreshToken.generateToken(user._id, jwtToken.expirationDate);
            res.json({
                user: user,
                token: jwtToken.token,
                tokenExpired: jwtToken.expirationDate,
                refreshToken: refreshToken.token,
                refreshTokenExpired: refreshToken.expirationDate
            });
        });
    });
}