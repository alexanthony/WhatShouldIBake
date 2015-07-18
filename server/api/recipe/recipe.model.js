'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  name: String,
  link: String,
  img: String,
  sweet: Boolean,
  gluten: Boolean,
  plural: Boolean
});

module.exports = mongoose.model('Recipe', RecipeSchema);