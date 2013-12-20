(function() {

    "use strict";

    angular.module('demo.strings', [])

    .controller('DemoStringsCtrl', ['$scope', function($scope) {
        $scope.slugifyExample = "my blog example here";
        $scope.codeExample = "";
    }]);

})();