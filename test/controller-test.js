const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const User = require('../server/controllers/users');
const Book = require('../server/controllers/books');
const db = require('../server/models/index');

var globalToken;
var globalUserId;

describe('Dropping db...', function(){
  //db clearing starts from controllers!
  before(function(){
    return db.sequelize.sync({ force: true }, function(err,success) {
      done();
    })
  });
  describe('Test : User Controller functions via routes', function() {
    it('should return a json obj with the msg "user created successfully"',function(done){
      request(app).post('/register').set('Accept', 'application/json').send({
        name: 'hellothere',
        email: 'hello2@hello.com',
        password: 'veryvalidpassword'
      }).end(function(err, res) {
        expect(res.body).to.be.json;
        expect(res.body.msg).to.equal('user created successfully');
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should return a json obj with a token indicating the user has logged in',function(done){
      request(app).post('/login').set('Accept', 'application/json').send({
        email: 'hello2@hello.com',
        password: 'veryvalidpassword'
      }).end(function(err, res) {
        expect(res.body).to.be.json;
        expect(res.body.msg).to.equal('successfully logged in');
        expect(res.body.username).to.equal('hellothere');
        expect(res.body.token).to.exist;
        globalToken = res.body.token;
        globalUserId = res.body.userId;
        done();
      });
    });
    it('should allow an authorized put request since token was sent along with request',function(done){
      request(app).put(`/${globalUserId}`).set('Authorization', `Bearer ${globalToken}`).set('Accept', 'application/json').send({
        name: 'lalalalala',
      }).end(function(err, res) {
        expect(res.body).to.be.json;
        expect(res.body.name).to.equal('lalalalala');
        done();
      });
    });
  });
})
