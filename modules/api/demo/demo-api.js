(function() {

    "use strict";

    angular.module('demo.api', [])

    .controller('DemoApiCtrl', ['$scope', 'Api', function($scope, Api) {
        Api.setBase('http://api.randomuser.me/');
        $scope.results = 1;

        $scope.loadRandomUser = function() {
            Api.get('', {
                results: $scope.results
            }).success(function(data) {
                $scope.randomUsers = data;
            });
        };

        $scope.codeExample = "";
    }]);

})();