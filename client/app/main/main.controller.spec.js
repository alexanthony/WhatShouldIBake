'use strict';

describe('Controller: MainCtrl', function () {
  var mockRecipeFactory = {};
  // load the controller's module
  beforeEach(module('whatShouldIbakeApp', function ($provide) {
    $provide.value('recipes', mockRecipeFactory);
  }));

  var MainCtrl,
      scope,
      $q;

  var mockRecipeResponse = [{
        name : 'Chocolate Brownies',
        link : 'http://www.bbc.co.uk/food/recipes/richchocolatebrownie_1933',
        img  : 'http://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/richchocolatebrownie_1933_16x9.jpg',
        sweet: true,
        gluten: true,
        plural: true
      }];
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$q_) {
    $q = _$q_;
    mockRecipeFactory.query = function(success) {
      success(mockRecipeResponse);
      return $q.when(mockRecipeResponse);
    };

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of recipes to the scope', function () {
    expect(scope.recipes.length).toBe(1);
  });

  // it('should call the recipe service query', function() {
  //   expect(mockRecipeFactory.query).toHaveBeenCalled();
  // });
});
