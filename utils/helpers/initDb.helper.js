const User = require('../../models/user.model');
const config = require('../../config/env');

module.exports.initAdmin = async () => {
    const isAdminInConfigNotExist = !config.defaultAdmin;
    if(isAdminInConfigNotExist) return;

    const isAdminInDbExist = await User.findOne({username: config.defaultAdmin.username});
    if(isAdminInDbExist) return;

    await User.create(config.defaultAdmin).save();
};