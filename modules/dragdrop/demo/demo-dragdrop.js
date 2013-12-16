(function() {
    
    "use strict";
    
    angular.module('demo.dragdrop', [
        'common.dragdrop'
    ])

    .controller('DemoDragDropCtrl', ['$scope', function($scope) {
        $scope.items = [
            {
                id: 3,
                name:'Item 1'
            },
            {
                id: 4,
                name:'Item 2'
            },
            {
                id: 5,
                name:'Item 3'
            },
            {
                id: 6,
                name:'Item 4'
            }
        ];
              
        $scope.objects = [
            {
                id: 1,
                name: 'New Item 1'
            },
            {
                id: 2,
                name: 'New Item 2'
            }
        ];

        $scope.updateObjects = function(id, from, to) {
            $scope.items.splice(to, 0, $scope.items.splice(from, 1)[0]);
        };

        $scope.createObject = function(id, to) {
            var object = _.findWhere($scope.objects, { id: +id });
            var newItem = angular.copy(object);
            newItem.id = Math.ceil(Math.random() * 1000);

            $scope.items.splice(to, 0, newItem);
        };
    }])
    
;})();