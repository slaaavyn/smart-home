const Document = require('camo').Document;
const { v4: uuidv4 } = require('uuid');

class RefreshToken extends Document {
    constructor() {
        super();

        this.userId = {
            type: String,
            required: true,
            unique: true
        };

        this.token = {
            type: String,
            required: true
        }

        this.expirationDate = {
            type: Date,
            required: true
        }
    }

    static collectionName() {
        return 'refreshTokens';
    }

    static async generateToken(userId, jwtTokenExpiredDate = new Date()) {
        const tokenInDb = await RefreshToken.findOne({userId: userId});
        if(tokenInDb) tokenInDb.delete();

        return await RefreshToken.create({
            userId: userId,
            token: uuidv4(),
            expirationDate: new Date(jwtTokenExpiredDate).setDate(jwtTokenExpiredDate.getDate() + 7)
        }).save();
    }
}

module.exports = RefreshToken;