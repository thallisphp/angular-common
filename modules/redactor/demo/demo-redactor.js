(function() {

    "use strict";

    angular.module('demo.redactor', [])

    .controller('DemoRedactorCtrl', ['$scope', function($scope) {
        $scope.codeExample = "";
    }]);

})();