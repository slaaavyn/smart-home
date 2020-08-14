const userRoles = require('../../utils/roles.type');

module.exports =Object.freeze({
    env: 'development',
    dbUri: 'nedb://./data',
    port: 8080,
    jwtSecret: 'mySuperSecretMecheniy',
    jwtPrefix: 'Bearer ',
    defaultAdmin: Object.freeze({
        "username": "root",
        "password": "toor",
        "firstName": "admin",
        "lastName": "admin",
        "role": userRoles.ROLE_ADMIN
    })
});