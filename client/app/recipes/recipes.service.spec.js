'use strict';

describe('Service: recipes', function () {

  // load the service's module
  beforeEach(module('whatShouldIbakeApp'));

  // instantiate service
  var recipes,
      $httpBackend;
  beforeEach(inject(function (_recipes_) {
    recipes = _recipes_;
  }));

    // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/recipes')
      .respond([{
    name : 'Chocolate Brownies',
    link : 'http://www.bbc.co.uk/food/recipes/richchocolatebrownie_1933',
    img  : 'http://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/richchocolatebrownie_1933_16x9.jpg',
    sweet: true,
    gluten: true,
    plural: true
  }]);
  }));

  it('should return a list', function () {
    var recipeList = recipes.query();
    $httpBackend.flush();
    recipeList.$promise.then(function() {
      expect(recipeList.length).toBe(1);
    });
  });

});
