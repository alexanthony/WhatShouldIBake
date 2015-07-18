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

// Get list of recipes
exports.index = function(req, res) {
  console.log(req.query);
  var sweetOnly = false;
  var savouryOnly = false;
  if (req.query.sweet === 'true') {
    sweetOnly = true;
  } else if (req.query.sweet === 'false') {
    savouryOnly = true;
  }
  if (sweetOnly && savouryOnly) {
    return handleError(res, 'Cannot be both sweet only and savoury only');
  }

  var query = Recipe.find()
  if (sweetOnly) {
    query.where('sweet').equals(true);
  } else if (savouryOnly) {
    query.where('sweet').equals(false);
  }
  query.exec(function (err, recipes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(recipes);
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
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Recipe.findById(req.params.id, function (err, recipe) {
    if (err) { return handleError(res, err); }
    if(!recipe) { return res.send(404); }
    var updated = _.merge(recipe, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(recipe);
    });
  });
};

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

function handleError(res, err) {
  return res.status(500).send(err);
}