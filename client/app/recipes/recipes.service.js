'use strict';

angular.module('whatShouldIbakeApp')
  .factory('recipes', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('/api/recipes/:id/:controller', {},
    {markAsBroken: {
      method : 'PUT',
      params: {
        id : '@_id',
        controller : 'broken'
      }
    }});
  });
