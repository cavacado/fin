const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const User = require('../server/controllers/users');
const Book = require('../server/controllers/books');
const db = require('../server/models/index');

var globalToken;
var globalUserId;
var globalBookId;

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
    it('should allow an authorized PUT request since token was sent along with request',function(done){
      request(app).put(`/${globalUserId}`).set('Authorization', `Bearer ${globalToken}`).set('Accept', 'application/json').send({
        name: 'lalalalala',
      }).end(function(err, res) {
        expect(res.body).to.be.json;
        expect(res.body.name).to.equal('lalalalala');
        done();
      });
    });
    it('should allow an authorized GET request since token was sent along with request',function(done){
      request(app).get(`/`).set('Authorization', `Bearer ${globalToken}`).end(function(err, res) {
        expect(res.body).to.be.json;
        expect(res.body.msg).to.equal('root for users page');
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should allow an authorized POST request to booksController since token was sent along with request',function(done){
      request(app).post(`/${globalUserId}/books`)
      .set('Authorization', `Bearer ${globalToken}`)
      .set('Accept', 'application/json').send({
        title: 'a book title',
        author: 'some author',
        description: 'describ'
      }).end(function(err, res) {
        globalBookId = res.body.id;
        expect(res.body).to.be.json;
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should allow an authorized PUT request to booksController since token was sent along with request',function(done){
      request(app).put(`/books/${globalBookId}`)
      .set('Authorization', `Bearer ${globalToken}`)
      .set('Accept', 'application/json').send({
        title: 'another book title',
      }).end(function(err, res) {
        expect(res.body).to.be.json;
        expect(res.body.title).to.equal('another book title');
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should allow an authorized GET (all) request since token was sent along with request',function(done){
      request(app).get(`/${globalUserId}/books`).set('Authorization', `Bearer ${globalToken}`).end(function(err, res) {
        expect(res.body).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should allow an authorized GET (one) request since token was sent along with request',function(done){
      request(app).get(`/books/${globalBookId}`).set('Authorization', `Bearer ${globalToken}`).end(function(err, res) {
        expect(res.body).to.be.json;
        expect(res.body.author).to.equal('some author');
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should allow an authorized DELETE request since token was sent along with request',function(done){
      request(app).delete(`/books/${globalBookId}`).set('Authorization', `Bearer ${globalToken}`).end(function(err, res) {
        expect(res.body).to.be.json;
        expect(res.body.msg).to.equal('book successfully deleted');
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should allow an authorized DELETE request since token was sent along with request',function(done){
      request(app).delete(`/${globalUserId}`).set('Authorization', `Bearer ${globalToken}`).end(function(err, res) {
        expect(res.body).to.be.json;
        expect(res.body.msg).to.equal('user deleted successfully');
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
})
