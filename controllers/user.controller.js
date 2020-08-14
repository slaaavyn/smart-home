const createError = require('http-errors');
const User = require('../models/user.model');
const userRole = require('../utils/roles.type');

module.exports.load = (req, res, next, id) => {
    User.getUserById(id)
        .then((user) => {
            if (!user) return next(createError(404, 'User not found'));

            req.dbUser = user;
            return next();
        })
        .catch((e) => next(createError(e)));
}

module.exports.create = async (req, res, next) => {
    if (await User.isUserExist(req.body.username)) {
        return next(createError(409, `User with username: ${req.body.username} already exist`));
    }

    User.create(req.body).save()
        .then((createdUser) => {
            delete createdUser.password;
            res.json(createdUser);
        }).catch((e) => {
            return next(createError(400, e));
        });
}

module.exports.getUserList = (req, res, next) => {
    User.find()
        .then((userList) => {
            userList.forEach(user => delete user.password);
            res.json(userList);
        }).catch((e) => {
            createError(e);
        });
}

module.exports.getUserById = (req, res, next) => {
    if(req.dbUser) {
        delete req.dbUser.password;
        res.json(req.dbUser);
    } else return next(createError(404, "User not found"));
}

module.exports.updateUser = async (req, res, next) => {
    const incomingUser = req.body;
    const dbUser = req.dbUser;

    dbUser.firstName = incomingUser.firstName ? incomingUser.firstName : dbUser.firstName;
    dbUser.lastName = incomingUser.lastName ? incomingUser.lastName : dbUser.lastName;
    dbUser.role = incomingUser.role ? await updateRole(incomingUser.role, dbUser) : dbUser.role;

    dbUser.save()
        .then((updatedUser) => {
            delete updatedUser.password;
            res.json(updatedUser);
        }).catch((e) => next(createError(400, 'User not update')))
}

module.exports.changeUserPassword = async (req, res, next) => {
    try {
        //Get parameters from the body
        const {oldPassword, newPassword} = req.body;

        // get user from db
        let user = await User.getUserById(req.user.id);

        // validate old password
        const isOldPasswordCompared = await user.comparePassword(oldPassword);
        if(!isOldPasswordCompared) throw createError(400, 'old password is not valid');

        // set new password, hash and save
        user.password = newPassword;
        user = await user.save();

        // send response
        delete user.password;
        res.json(user);
    } catch (e) {
        next(e);
    }
}

module.exports.removeUserById = async (req, res, next) => {
    const dbUser = req.dbUser;

    if(await dbUser.isLastAdmin()) {
        return next(createError(400, 'it is not possible to remove a single administrator'));
    }

    dbUser.delete().then(result => {
        res.send(null);
    }).catch(e=>{
        console.log(e);
        return next(createError(400, e));
    });
}

async function updateRole(role, user) {
    // check is role valid
    if(!role || !Object.values(userRole).includes(role)) return user.role;

    // checking if the updated user is the last administrator
    if (user.role === userRole.ROLE_ADMIN
        && role !== userRole.ROLE_ADMIN
        && await user.isLastAdmin()) {
        return user.role;
    }

    return role;
}