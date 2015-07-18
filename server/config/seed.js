/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
/* 
var RecipeSchema = new Schema({
  name: String,
  link: String,
  img: String,
  sweet: Boolean,
  gluten: Boolean,
  plural: Boolean
});
*/

'use strict';

var Recipe = require('../api/recipe/recipe.model');


Recipe.find({}).remove(function() {
  Recipe.create({
    name : 'Chocolate Brownies',
    link : 'http://www.bbc.co.uk/food/recipes/richchocolatebrownie_1933',
    img  : 'http://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/richchocolatebrownie_1933_16x9.jpg',
    sweet: true,
    gluten: true,
    plural: true
  },
  {
    name : 'Victoria Sandwich',
    link : 'http://www.bbc.co.uk/food/recipes/mary_berrys_perfect_34317',
    img  : 'http://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/mary_berrys_perfect_34317_16x9.jpg',
    sweet: true,
    gluten: true,
    plural: false
  });
});