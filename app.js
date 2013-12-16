(function() {
    
    "use strict";
    
    angular.module('angular-common', [
        'demo.drag',
        'demo.dragdrop'
    ])

    .controller('MainCtrl', ['$scope', function($scope) {
        $scope.modules = [
            'drag',
            'dragdrop',
        ];
    }])
    
;})();