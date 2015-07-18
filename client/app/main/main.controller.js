'use strict';

angular.module('whatShouldIbakeApp')
  .controller('MainCtrl', function ($scope, $http) {
    var getRecipes = function() {
      $http.get('/api/recipes').success(function(recipes) {
        $scope.recipes = recipes;
      });
    };

    $scope.recipes = [];

    getRecipes();

    var recipeNumber = 0;

    $scope.recipe = function() {
      return $scope.recipes[recipeNumber];
    };

    $scope.nextRecipe = function() {
      recipeNumber++;
      if (recipeNumber >= $scope.recipes.length) {
        recipeNumber = 0;
        getRecipes();
      }
    };

    $scope.toggleRude = function() {
      if ($scope.rude) {
        $scope.rude = false;
      } else {
        $scope.rude = true;
      }
    };

    $scope.toggleSweetSavoury = function() {
      getRecipes();
      recipeNumber = 0;
    };

    $scope.rude = true;
  });
