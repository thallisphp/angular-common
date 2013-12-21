(function() {

    "use strict";

    angular.module('demo.strings', [])

    .controller('DemoStringsCtrl', ['$scope', function($scope) {
        $scope.slugifyExample = "my blog example here";
        $scope.codeExample = "{{ 'title case' | titleCase }}\n" +
        "{{ 'Lower Case' | lowerCase }}\n" +
        "{{ 'nl\\nbr' | nl2br }}\n" +
        "{{ 'I soooo loooonnnggggg' | truncate:15 }}\n" +
        "{{ 'http://www.google.com' | encodeURIComponent }}\n" +
        "<input type='text' ng-model='slugifyExample' slugify>";
    }]);

})();