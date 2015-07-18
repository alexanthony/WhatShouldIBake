'use strict';

angular.module('whatShouldIbakeApp')
  .controller('MainCtrl', function ($scope, $http, recipes) {
    var recipeNumber = 0;
    var getRecipes = function() {
      var recipeOptions = {
        glutenfree : $scope.glutenFree,
        maxresults : 20
      };
      if ($scope.sweetSavoury === true) {
        recipeOptions.sweet = true;
      } else if ($scope.sweetSavoury === false) {
        recipeOptions.sweet = false;
      }
      // Save off the old id so we can make sure we definitely change
      
      var lastRecipeId;
      if ($scope.recipes.length > 0) {
        lastRecipeId = $scope.recipes[recipeNumber]._id;
      }
      recipes.query(recipeOptions, function(data) {
        if (data.length > 0 && data[0]._id === lastRecipeId) {
          recipeNumber = 1;
        } else {
          recipeNumber = 0;
        }
        $scope.recipes = data;
      });
    };

    $scope.recipes = [];
    $scope.glutenFree = false;

    getRecipes();

    $scope.recipe = function() {
      return $scope.recipes[recipeNumber];
    };

    $scope.nextRecipe = function() {
      if (recipeNumber + 1 >= $scope.recipes.length) {
        getRecipes();
      } else {
        recipeNumber++;
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
    };

    $scope.toggleGlutenFree = function() {
      $scope.glutenFree = !$scope.glutenFree;
      getRecipes();
    };

    $scope.markAsBroken = function() {
      recipes.markAsBroken($scope.recipe());
      getRecipes();
    };

    $scope.rude = true;
  });
