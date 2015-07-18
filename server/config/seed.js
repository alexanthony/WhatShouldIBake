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
    plural: true,
    investigateBreakage: false
  },
  {
    name : 'Victoria Sandwich',
    link : 'http://www.bbc.co.uk/food/recipes/mary_berrys_perfect_34317',
    img  : 'http://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/mary_berrys_perfect_34317_16x9.jpg',
    sweet: true,
    gluten: true,
    plural: false,
    investigateBreakage: true
  },
  {
    name : 'Bacon and Cheese Bread',
    link : 'http://www.browneyedbaker.com/bacon-and-cheese-easter-bread/',
    img  : 'http://www.browneyedbaker.com/wp-content/uploads/2012/04/bacon-cheese-bread-1-550.jpg',
    sweet: false,
    gluten: true,
    plural: false,
    investigateBreakage: false
  },
  {
    name: 'Carrot Cake',
    link: 'http://www.bbcgoodfood.com/recipes/1658634/glutenfree-carrot-cake',
    img: 'http://www.bbcgoodfood.com/sites/bbcgoodfood.com/files/recipe_images/recipe-image-legacy-id--1201555_11.jpg',
    sweet: true,
    gluten: false,
    plural: false,
    investigateBreakage: false
  });
});