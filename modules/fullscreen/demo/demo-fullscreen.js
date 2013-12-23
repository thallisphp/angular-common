(function() {

    'use strict';

    angular.module('demo.fullscreen', [
        'common.fullscreen'
    ])

    .controller('DemoFullscreenCtrl', ['$scope', 'Fullscreen', function($scope, Fullscreen) {

        $scope.fullscreen = function() {
            if (Fullscreen.isEnabled()) {
                Fullscreen.cancel();
            } else {
                Fullscreen.all();
            }
        };

        $scope.codeExample = "<button\n"+
        "    class='btn btn-default'\n"+
        "    ng-click='fullscreen()'>\n"+
        "    Go fullscreen\n"+
        "</button>";
    }]);

})();

