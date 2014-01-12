(function() {

    'use strict';

    angular.module('demo.progress', [
        'common.progress'
    ])

        .controller('DemoProgressCtrl', ['$scope', 'ProgressService', function($scope, ProgressService) {
            $scope.ProgressService = ProgressService;
            ProgressService.start('loadUser', 10);
            ProgressService.start('loadTasks', 25);
            ProgressService.done('loadUser');

            $scope.codeExample = "$scope.ProgressService = ProgressService;\n" +
                "ProgressService.start('loadUser', 10);\n" +
                "ProgressService.start('loadTasks', 30);\n" +
                "ProgressService.done('loadUser');";
        }]);

})();