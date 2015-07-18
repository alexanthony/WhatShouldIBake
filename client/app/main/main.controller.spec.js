'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('whatShouldIbakeApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
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

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.recipes.length).toBe(1);
  });
});
