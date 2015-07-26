'use strict';

angular.module('whatShouldIbakeApp')
  .controller('MainCtrl', function ($scope, $http, recipes, $location, $document) {
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
        if (data.length > 1 && data[0]._id === lastRecipeId) {
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
    var setTitle = function() {
      if ($scope.rude) {
        $document[0].title = 'What The Fuck Should I Bake?';
      } else {
        $document[0].title = 'What Should I Bake?';
      }
    };

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
      $scope.rude = !$scope.rude;
      setTitle();
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

    if ($location.absUrl().indexOf('wtf') > -1 || $location.absUrl().indexOf('fuck') > -1) {
      $scope.rude = true;
    } else {
      $scope.rude = false;
    }

    setTitle();
  });
