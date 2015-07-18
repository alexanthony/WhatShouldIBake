'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/recipes', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/recipes')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should only include sweet recipes when query asks for it', function(done) {
    request(app)
      .get('/api/recipes')
      .query({sweet: true})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var recipes = res.body;
        for (var i = 0; i < recipes.length; i++) {
          recipes[i].sweet.should.be.exactly(true);
        }
        done();
      });
  });

  it('should only include savoury recipes when query asks for it', function(done) {
    request(app)
      .get('/api/recipes')
      .query({sweet: false})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var recipes = res.body;
        for (var i = 0; i < recipes.length; i++) {
          recipes[i].sweet.should.be.exactly(false);
        }
        done();
      });
  });

  it('should only include gluten free recipes when asked for them', function(done) {
    request(app)
      .get('/api/recipes')
      .query({glutenfree: true})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        var recipes = res.body;
        for (var i = 0; i < recipes.length; i++) {
          recipes[i].gluten.should.be.exactly(false);
        }
        done();
      });
  });


  it('should return 1 recipe when an id is supplied', function(done) {
    var recipeId;
    request(app)
      .get('/api/recipes')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body[0]);
        recipeId = res.body[0]._id;

        request(app)
          .get('/api/recipes/'+recipeId)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Object);
            res.body._id.should.be.exactly(recipeId);
          });
         });
        done();

  });
});
