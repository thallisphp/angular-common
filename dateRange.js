(function() {
    
    "use strict";
    
    angular.module('common.dateRange', [])
    
    .directive('dateRange', ['$window', function ($window) {
        return {
            restrict: 'A',
            scope: {
                options: '=',
                onChange: '&'
            },
            template: "<i class='icon-calendar'></i> <span></span> <b class='caret'></b>",
            link: function (scope, element) {
                $(element).daterangepicker(scope.options, function(start, end){
                    $(element).find('span').html(start.format('M/D/YYYY') + ' - ' + end.format('M/D/YYYY'));
    
                    scope.$apply(function () {
                        scope.onChange({ start: start, end: end });
                    });
                });
                    
                $(element).find('span').html($window.moment(scope.options.startDate).format('M/D/YYYY') + ' - ' + $window.moment(scope.options.endDate).format('M/D/YYYY'));
            }
        };
    }]);

})();