const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('./env');

module.exports.checkJwt = (req, res, next) => {
    // Validate token
    const incomingToken = req.headers.authorization;
    if(!isIncomingTokenValid(incomingToken)) {
        return next(createError(401, 'invalid token...'));
    }

    // Verify token
    jwt.verify(incomingToken.slice(7), config.jwtSecret, (e, decodedUser) => {
       if(e) return next(createError(401, 'invalid token...'));

        User.findOne({username: decodedUser.username}).then(user => {
            if (!user) return next(createError(401, 'invalid token...'));

            res.req.user = decodedUser;
            next();
        });
    });
}

module.exports.checkUserRole = (roles = []) => {
    return async (req, res, next) => {
        //Get user role from the database
        let user;
        try {
            const id = res.req.user.id;
            user = await User.findOne({_id: id});

            if(!user) throw '';
        } catch {
            return next(createError(401, 'the user who sent the request is not found'));
        }

        //Check if array of authorized roles includes the user's role
        if (roles.length === 0 || roles.indexOf(user.role) > -1) next();
        else next(createError(401, 'Access denied for this user'));
    };
};

module.exports.generateJwt = (user) => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 1);

    return {
        token: config.jwtPrefix + jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, config.jwtSecret),

        expirationDate: expirationDate
    }
}

function isIncomingTokenValid(token) {
    return token && token.includes(config.jwtPrefix);
}