'use strict';

describe('Directive: loadingSrc', function () {

  // load the directive's module
  beforeEach(module('whatShouldIbakeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should have image-src and loading-src attributes, with non-default loading image', inject(function ($compile) {
    element = angular.element('<img loading-src="http://jimpunk.net/Loading/wp-content/uploads/loading1.gif" image-src="http://www.saveur.com/sites/saveur.com/files/styles/large_1x_/public/import/2014/recipe_pear-tart-tatin.jpg?itok=ivZli6e4">');
    element = $compile(element)(scope);
    expect(element.attr('image-src')).toBe('http://www.saveur.com/sites/saveur.com/files/styles/large_1x_/public/import/2014/recipe_pear-tart-tatin.jpg?itok=ivZli6e4');
    expect(element.attr('loading-src')).toBe('http://jimpunk.net/Loading/wp-content/uploads/loading1.gif');
    expect(element.attr('src')).toBe('http://jimpunk.net/Loading/wp-content/uploads/loading1.gif');
  }));

  // it('should replace src with image-src when onload is called', inject(function ($compile) {
  //   element = angular.element('<img loading-src="http://jimpunk.net/Loading/wp-content/uploads/loading1.gif" image-src="http://www.saveur.com/sites/saveur.com/files/styles/large_1x_/public/import/2014/recipe_pear-tart-tatin.jpg?itok=ivZli6e4">');
  //   element = $compile(element)(scope);
  //   setTimeout(function() {
  //     console.log(element.attr('src'));
  //     expect(element.attr('src')).toBe('http://jimpunk.net/Loading/wp-content/uploads/loading1.gif');
  //   }, 10000);
  // }));
});