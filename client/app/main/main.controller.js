'use strict';

angular.module('whatShouldIbakeApp')
  .controller('MainCtrl', function ($scope, $http, recipes) {
    var getRecipes = function() {
      recipes.query({
        glutenfree : $scope.glutenFree
      }, function(data) {
        $scope.recipes = data;
      });
    };

    $scope.recipes = [];
    $scope.glutenFree = false;

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
      $scope.sweetSavoury = !$scope.recipe().sweet;
      getRecipes();
      recipeNumber = 0;
    };

    $scope.toggleGlutenFree = function() {
      $scope.glutenFree = !$scope.glutenFree;
      getRecipes();
      recipeNumber = 0;
    };

    $scope.rude = true;
  });
