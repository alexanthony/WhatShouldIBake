'use strict';

angular.module('whatShouldIbakeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/recipes').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.rude = true;
  });
