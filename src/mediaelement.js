(function() {
    
    "use strict";
    
    angular.module('', [])
    
    .directive('mediaelement', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                attrs.$observe('src', function() {
                    element.mediaelementplayer();
                });
            }
        };
    }]);
    
})();
