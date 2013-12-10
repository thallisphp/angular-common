(function() {
    
    "use strict";
    
    angular.module('common.mediaelement', [])
    
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
