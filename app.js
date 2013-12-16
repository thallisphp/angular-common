(function() {
    
    "use strict";
    
    angular.module('angular-common', [
        'demo.drag',
        'demo.dragdrop'
    ])

    .controller('MainCtrl', ['$scope', function($scope) {
        $scope.modules = [
            'common',
            'api',
            'confirm',
            'dateRange',
            'drag',
            'dragdrop',
            'mediaelement',
            'modal',
            'ngBindHtmlUnsafe',
            'print',
            'redactor',
            'strings',
            'time',
            'upload',
            'youtube'
        ];
    }])
    
;})();