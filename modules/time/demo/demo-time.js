(function() {

    "use strict";

    angular.module('demo.time', [])

    .controller('DemoTimeCtrl', ['$scope', function($scope) {
        $scope.timeExample = moment().format("YYYY-MM-DD H:mm:ss");
        $scope.codeExample = "";
    }]);

})();