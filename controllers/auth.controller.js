const User = require('../models/user.model');
const jwtConfig = require('../config/jwt.config');
const createError = require('http-errors');

module.exports.authenticate = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).then((user) => {
        if (!user) return next(createError(403, 'user not exist'));

        user.comparePassword(req.body.password).then((isMatch) => {
            if (!isMatch) return next(createError(403, 'incorrect password'));

            delete user.password;
            res.json({
                user: user,
                token: jwtConfig.generateJwt(user)
            });
        });
    });
}