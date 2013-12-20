(function() {

    "use strict";

    angular.module('demo.youtube', [])

    .controller('DemoYoutubeCtrl', ['$scope', function($scope) {
        $scope.youtubeUrl = 'http://www.youtube.com/watch?v=WrO9PTpuSSs';
        $scope.codeExample = "";
    }]);

})();