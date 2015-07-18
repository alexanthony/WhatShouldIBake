/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /recipes              ->  index
 * POST    /recipes              ->  create
 * GET     /recipes/:id          ->  show
 * PUT     /recipes/:id          ->  update
 * DELETE  /recipes/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Recipe = require('./recipe.model');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get list of recipes
exports.index = function(req, res) {
  console.log(req.query);
  var sweetOnly = false;
  var savouryOnly = false;
  var glutenFree = false;
  if (req.query.sweet === 'true') {
    sweetOnly = true;
  } else if (req.query.sweet === 'false') {
    savouryOnly = true;
  }
  if (sweetOnly && savouryOnly) {
    return handleError(res, 'Cannot be both sweet only and savoury only');
  }
  if (req.query.glutenfree === 'true') {
    glutenFree = true;
  }

  var query = Recipe.find()
  if (sweetOnly) {
    query.where('sweet').equals(true);
  } else if (savouryOnly) {
    query.where('sweet').equals(false);
  }
  if (glutenFree) {
    query.where('gluten').equals(false);
  }
  query.where('investigateBreakage').equals(false);
  query.exec(function (err, recipes) {
    if(err) { return handleError(res, err); }
    var result = [];
    var resultCount = 0;
    if (req.query.maxresults && req.query.maxresults < recipes.length) {
      resultCount = req.query.maxresults;
    } else {
      resultCount = recipes.length;
    }
    while (result.length < resultCount) {
      var recipeToAddIndex = getRandomInt(0, recipes.length - 1);
      result.push(recipes[recipeToAddIndex]);
      recipes.splice(recipeToAddIndex, 1);
    }
    return res.status(200).json(result);
  });
};

// Get a single recipe
exports.show = function(req, res) {
  Recipe.findById(req.params.id, function (err, recipe) {
    if(err) { return handleError(res, err); }
    if(!recipe) { return res.status(404); }
    return res.json(recipe);
  });
};

// // Creates a new recipe in the DB.
// exports.create = function(req, res) {
//   Recipe.create(req.body, function(err, recipe) {
//     if(err) { return handleError(res, err); }
//     return res.status(201).json(recipe);
//   });
// };

// Updates an existing recipe in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Recipe.findById(req.params.id, function (err, recipe) {
//     if (err) { return handleError(res, err); }
//     if(!recipe) { return res.send(404); }
//     var updated = _.merge(recipe, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(recipe);
//     });
//   });
// };

// // Deletes a recipe from the DB.
// exports.destroy = function(req, res) {
//   Recipe.findById(req.params.id, function (err, recipe) {
//     if(err) { return handleError(res, err); }
//     if(!recipe) { return res.send(404); }
//     recipe.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };
exports.markAsBroken = function(req, res, next) {
  var id = req.params.id;
  Recipe.findById(id, function(err, recipe) {
    if (err) { return handleError(res, err); }
    if(!recipe) { return res.send(404); }
    recipe.investigateBreakage = true;
    recipe.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(recipe);
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}