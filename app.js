(function() {

    "use strict";

    angular.module('angular-common', [
        'common.master',
        'demo.api',
        'demo.confirm',
        'demo.daterange',
        'demo.drag',
        'demo.dragdrop',
        'demo.mediaelement',
        'demo.modal',
        'demo.ngBindHtmlUnsafe',
        'demo.print',
        'demo.redactor',
        'demo.skype',
        'demo.strings',
        'demo.time',
        'demo.upload',
        'demo.youtube'
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
            'skype',
            'strings',
            'time',
            'upload',
            'youtube'
        ];
    }])

;})();