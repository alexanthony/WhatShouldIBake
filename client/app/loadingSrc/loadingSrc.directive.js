'use strict';

angular.module('whatShouldIbakeApp')
  .directive('loadingSrc', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {

        var loadingImgSrc = attr.loadingSrc || '';
        element[0].src = loadingImgSrc;

        attr.$observe('imageSrc', function(value) {

          // Load up new image
          var img = new Image();
          img.src = value;
          // Clear the old image instantly
          element[0].src = '';
          // Set loading image while we wait
          element[0].src = loadingImgSrc;
          // Once image is loaded, replace displayed image with this one
          img.onload = function () {
              img.onload = null;
              if (element[0].src !== img.src) {
                  element[0].src = img.src;
              }
          };
        });
      }    
    };
  });