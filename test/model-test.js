const expect = require('chai').expect;
const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');
const User = require('../server/models').User;
const Book = require('../server/models').Book;
const db = require('../server/models/index');

describe('Test : User Model validations', function(){
  it('should throw a validation error if name is not provided',function(done){
    User.create({
      email: 'email@email.com',
      password: 123456,
    }).catch(error => {
       expect(error.name).to.equal('SequelizeValidationError');
       done();
     })
  });
  it('should throw a validation error if email is not provided',function(done){
    User.create({
      name: 'hey now',
      password: 123456,
    }).catch(error => {
       expect(error.name).to.equal('SequelizeValidationError');
       done();
     })
  });
  it('should throw a validation error if password is not provided',function(done){
    User.create({
      name: 'stay awake',
      email: 'email@email.com',
    }).catch(error => {
       expect(error.name).to.equal('SequelizeValidationError');
       done();
     })
  });
  it('should throw a validation error if password < 5 characters',function(done){
    User.create({
      name: 'stay awake',
      email: 'email@email.com',
      password: '1234'
    }).catch(error => {
       expect(error.name).to.equal('SequelizeValidationError');
       done();
     })
  });
  it('should hash the password after creating',function(done){
    let password = 'validpw';
    User.create({
      name: 'stay awake',
      email: 'email@email.com',
      password: password,
    }).then(user => {
      expect(user.password).to.not.equal(password);
      done();
    })
  });
  it('should throw a validation error if email is not unique',function(done){
    User.create({
      name: 'stay awake',
      email: 'email@email.com',
      password: 'validpw',
    }).catch(error => {
       expect(error.name).to.equal('SequelizeUniqueConstraintError');
       done();
     })
  });
  it('should return a true if authenticated instance method function works (hashed password === password)',function(done){
    User.find({
      where: { email: 'email@email.com'}
    }).then(user => {
      user.authenticated('validpw', function(err,result) {
        if (err => console.log(err))
        expect(result).to.be.true;
        done();
      })
    })
  });
});

describe('Test : Book Model validations', function(){
  it('should throw a validation error if title is not provided',function(done){
    Book.create({
      author: 'an author',
    }).catch(error => {
       expect(error.name).to.equal('SequelizeValidationError');
       done();
     })
  });
  it('should throw a validation error if author is not provided',function(done){
    Book.create({
      title: 'a title',
    }).catch(error => {
       expect(error.name).to.equal('SequelizeValidationError');
       done();
     })
  });
  it('read should default to false if not provided',function(done){
    let book = Book.build({ title: 'a title' })
    expect(book.read).to.be.false;
    done();
  });
})
