const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const db = require('../server/models/index');

describe('Test : GET * page as an unauthorized fellow', function(){
  it('should return a 401 unauthorized response',function(done){
    request(app).get('/*').end( function(err, res) {
      expect(res.body).to.be.json;
      expect(res.body.msg).to.equal('You need an authorization token to view this information!');
      expect(res.status).to.equal(401);
      done();
    });
  });
});
