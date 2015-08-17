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
          // Clear the old image instantly, but save its height
          var height = element[0].clientHeight;
          element[0].src = '';
          if (height > 0) {
            // Set the element to have a fixed height while there's no image loaded
            element[0].style.height = height+'px';
          }
          // Set loading image while we wait
          element[0].src = loadingImgSrc;
          // Once image is loaded, replace displayed image with this one
          element[0].onload = function() {
            element[0].style.height = 'auto';
            element[0].onload = null;
          };
          img.onload = function () {
              img.onload = null;
              if (element[0].src !== img.src) {
                element[0].src = img.src;
                element[0].style.height = 'auto';
                window.prerenderReady = true;
              }
          };
        });
      }    
    };
  });