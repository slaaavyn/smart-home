//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

const chai = require('chai');
const should = chai.should();

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app.js');

const User = require('../models/user.model');
const userRoles = require("../utils/roles.type");

describe('User API test', () => {
    let token, user;

    const adminObj = {
        username: 'admin',
        password: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        role: 'ROLE_ADMIN'
    };

    before((done) => {
        // create default admin user and made auth to get token
        User.create(adminObj).save().then((u) => {
            user = u;

            chai.request(server)
                .post('/api/auth')
                .send({username: 'admin', password: 'admin'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');

                    token = res.body.token;
                    done();
                });
        })
    });

    beforeEach((done) => {
        // clear users
        User.deleteMany({role: userRoles.ROLE_USER}).then(() => {
            User.deleteMany({role: userRoles.ROLE_DEVICE}).then(() => {
                done();
            });
        });
    });

    after((done) => {
        // clear all users
        User.deleteMany({}).then(() => {
            done();
        })
    });

    describe('GET /api/user', () => {
        it('it should GET all users', (done) => {
            chai.request(server)
                .get('/api/user')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it("it should GET user given the id", (done) => {
            chai.request(server)
                .get('/api/user/' + user._id)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username').eql(user.username);
                    done();
                });
        });
    });

    describe('POST /api/user', () => {
        it('it should create user and return created user', (done) => {
            const userObj = {
                username: 'user',
                password: 'user',
                firstName: 'user',
                lastName: 'user',
                role: userRoles.ROLE_USER
            };

            chai.request(server)
                .post('/api/user/create')
                .set('Authorization', token)
                .send(userObj)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('username').eql(userObj.username);
                    res.body.should.have.property('firstName').eql(userObj.firstName);
                    res.body.should.have.property('lastName').eql(userObj.lastName);
                    res.body.should.have.property('role').eql(userObj.role);

                    User.findOne({_id: res.body._id}).then((u) => {
                        u.should.be.a('object');
                        u.should.have.property('_id').eql(res.body._id);
                        u.should.have.property('username').eql(res.body.username);
                        u.should.have.property('firstName').eql(res.body.firstName);
                        u.should.have.property('lastName').eql(res.body.lastName);
                        u.should.have.property('role').eql(res.body.role);
                        done();
                    });
                });
        });

        it('it should update user password', (done) => {
            const updatePasswordObj  = {
                oldPassword: adminObj.password,
                newPassword: 'newPassword'
            }

            chai.request(server)
                .post('/api/user/update-password')
                .set('Authorization', token)
                .send(updatePasswordObj)
                .end((err, res) => {
                    res.should.have.status(200);

                    User.findOne({_id: user._id}).then((u) => {
                        u.should.not.to.be.null;
                        u.should.have.property('password').not.eql(user.password);
                        done();
                    });
                });
        });
    });

    describe('PUT /api/user', () => {
        it('it should UPDATE a user given the id', (done) => {
            const userObj = {
                username: 'user',
                password: 'user',
                firstName: 'user',
                lastName: 'user',
                role: userRoles.ROLE_USER
            };

            User.create(userObj).save().then((u) => {
                const updatedUserObj = {
                    username: 'usera',
                    password: 'usera',
                    firstName: 'usera',
                    lastName: 'usera',
                    role: userRoles.ROLE_DEVICE
                };

                chai.request(server)
                    .put('/api/user/' + u._id)
                    .set('Authorization', token)
                    .send(updatedUserObj)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(u._id);
                        res.body.should.have.property('username').eql(userObj.username);
                        res.body.should.have.property('firstName').eql(updatedUserObj.firstName);
                        res.body.should.have.property('lastName').eql(updatedUserObj.lastName);
                        res.body.should.have.property('role').eql(updatedUserObj.role);
                        done();
                    });
            });
        });
    });

    describe('DELETE /api/user', () => {
        it('it should DELETE a user given the id', (done) => {
            const userObj = {
                username: 'user',
                password: 'user',
                firstName: 'user',
                lastName: 'user',
                role: userRoles.ROLE_USER
            };

            User.create(userObj).save().then((u) => {

                chai.request(server)
                    .delete('/api/user/' + u._id)
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);

                        User.findOne({_id: u._id}).then((u) => {
                            chai.assert(u === null);
                            done();
                        });
                    });
            });
        });

        it('it should not DELETE a single admin user given the id', (done) => {
            chai.request(server)
                .delete('/api/user/' + user._id)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message');

                    done();
                });
        });
    });
});
