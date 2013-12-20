(function() {

    "use strict";

    angular.module('demo.skype', [])

    .controller('DemoSkypeCtrl', ['$scope', function($scope) {
        $scope.phoneNumber = "(425) 897 - 7897";
        $scope.codeExample = "";
    }]);

})();