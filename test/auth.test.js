process.env.NODE_ENV = 'test';

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

const chai = require('chai');
const should = chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app.js');

const User = require('../models/user.model');

describe('Auth API test', () => {
    const userObj = {
        username: 'admin',
        password: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        role: 'ROLE_ADMIN'
    };

    beforeEach((done) => {
        //remove all users from db
        User.deleteMany({}).then(() => {
            done();
        });
    });

    after((done) => {
        //remove all users from db
        User.deleteMany({}).then(() => {
            done();
        });
    });

    it('it should crate user, authorize and return tokens', (done) => {
        User.create(userObj).save().then((u) => {
            u.should.be.a('object');
            u.should.have.property('_id');
            u.should.have.property('username').eql(userObj.username);
            u.should.have.property('firstName').eql(userObj.firstName);
            u.should.have.property('lastName').eql(userObj.lastName);
            u.should.have.property('role').eql(userObj.role);

            chai.request(server)
                .post('/api/auth')
                .send({username: userObj.username, password: userObj.password})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    res.body.should.have.property('token');
                    res.body.should.have.property('tokenExpired');
                    res.body.should.have.property('refreshToken');
                    res.body.should.have.property('refreshTokenExpired');

                    done();
                });
        })
    });
});