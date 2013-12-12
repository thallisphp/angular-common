(function() {
    
    "use strict";
    
    angular.module('common.drag', [])
    
    // Would like to remove dependency on jqueryui
    // http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    .directive('drag', ['$timeout', function ($timeout) {
        return {
            scope: {
                dragTop: '=',
                dragLeft: '='
            },
            link: function (scope, element) {
                $(element).draggable({
                    stop: function(event, ui) {
                        $timeout(function() {
                            scope.dragTop = ui.position.top;
                            scope.dragLeft = ui.position.left;
                        });
                    }
                });
            }
        };
    }]);

})();