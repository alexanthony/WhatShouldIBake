'use strict';

angular.module('whatShouldIbakeApp')
  .factory('recipes', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/api/recipes');
  });
