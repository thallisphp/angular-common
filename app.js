(function() {

    "use strict";

    angular.module('angular-common', [
        'common.master',
        'demo.confirm',
        'demo.daterange',
        'demo.drag',
        'demo.dragdrop'
    ])

    .controller('MainCtrl', ['$scope', function($scope) {
        $scope.modules = [
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