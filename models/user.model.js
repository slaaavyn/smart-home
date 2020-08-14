const Document = require('camo').Document;
const bcrypt = require('bcrypt');
const userRole = require('../utils/roles.type');

class User extends Document {
    constructor() {
        super();

        this.username = {
            type: String,
            required: true,
            unique: true
        };
        this.password = {
            type: String,
            required: true
        };
        this.firstName = {
            type: String,
            required: true
        };
        this.lastName = {
            type: String,
            required: true
        };
        this.role = {
            type: String,
            choices: Object.values(userRole),
            required: true
        };
    }

    static collectionName() {
        return 'users';
    }

    static async isUserExist(username) {
        return !!(await User.findOne({username}));
    }

    static async getUserById(id) {
        return await User.findOne({_id: id});
    }

    async isLastAdmin() {
        if(this.role !== userRole.ROLE_ADMIN) {
            return false;
        }

        const adminList = await User.find({role: userRole.ROLE_ADMIN});
        return adminList.length === 1 && adminList[0].username === this.username;
    }

    comparePassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, this.password)
                .then(isCompared => resolve(isCompared))
                .catch(e => reject(e));
        });
    }

    async preSave() {
        const dbUser = await User.findOne({username: this.username});

        // if user not exist or password changed need to hash password
        const isNeedToHashPassword = !dbUser ? true : dbUser.password !== this.password;
        if(isNeedToHashPassword) this.hashPassword();
    }


    hashPassword() {
       this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }
}

module.exports = User;