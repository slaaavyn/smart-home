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
const Room = require('../models/room.model');

describe('Room API test', () => {
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
        Room.deleteMany({}).then(() => {
            done();
        });
    });

    after((done) => {
        // clear all rooms
        Room.deleteMany({}).then(() => {
            done();
        })
    });

    describe('GET /api/room', () => {
        it('it should GET all rooms', (done) => {
            Room.create({name: "room", deviceIdList: []}).save().then((room) => {
                chai.request(server)
                    .get('/api/room')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
                });
        });

        it("it should GET room given the id", (done) => {
            Room.create({name: "room", deviceIdList: []}).save().then((room) => {
                chai.request(server)
                    .get('/api/room/' + room._id)
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name').eql(room.name);
                        res.body.should.have.property('devices');
                        res.body.devices.should.be.a('array');
                        done();
                    });
                });
        });
    });

    describe('POST /api/room', () => {
        it('it should create room and return created room', (done) => {
            chai.request(server)
                .post('/api/room/?roomName=room')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name').eql('room');
                    res.body.should.have.property('devices');
                    res.body.devices.should.be.a('array');


                    Room.findOne({_id: res.body._id}).then((r) => {
                        r.should.be.a('object');
                        r.should.have.property('_id').eql(res.body._id);
                        r.should.have.property('name').eql('room');
                        r.should.have.property('deviceIdList');
                        r.deviceIdList.should.be.a('array');
                        done();
                    });
                });
        });

        it('it should not create room and return 401', (done) => {
            chai.request(server)
                .post('/api/room')
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');

                    done();
                });
        });
    });

    describe('PUT /api/room', () => {
        it('it should UPDATE a room name given the id', (done) => {

            Room.create({name: "room", deviceIdList: []}).save().then((r) => {
                chai.request(server)
                    .put('/api/room/' + r._id + '/?roomName=newRoom')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(r._id);
                        res.body.should.have.property('name').eql('newRoom');
                        res.body.should.have.property('devices');
                        res.body.devices.should.be.a('array');
                        done();
                    });
            });
        });
    });

    describe('DELETE /api/room', () => {
        it('it should DELETE a room given the id', (done) => {
            Room.create({name: "room", deviceIdList: []}).save().then((r) => {
                chai.request(server)
                    .delete('/api/room/' + r._id)
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);

                        Room.findOne({_id: r._id}).then((r) => {
                            chai.assert(r === null);
                            done();
                        });
                    });
            });
        });
    });
});

