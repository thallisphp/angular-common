(function() {

    'use strict';

    angular.module('common.skype', [])

    .filter('skype', [function() {
        return function(value) {
            if (!value) {
                return value;
            }

            value = value + "";

            if (value[0] === '1') {
                value = "+" + value;
            }

            if (value[0] !== '+' && value[1] !== '1') {
                value = "+1" + value;
            }

            return 'skype:' + value + '?call';
        };
    }]);

})();