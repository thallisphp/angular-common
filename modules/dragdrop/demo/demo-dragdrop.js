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

        $scope.codeExample = "<ul>\n" +
            "   <li\n" +
            "       ng-repeat='object in objects'\n" +
            "       draggable='object.id'\n" +
            "       draggable-target='#sortable'>\n" +
            "       {{ object.name }}\n" +
            "   </li>\n" +
            "</ul>\n\n" +
        
            "<ul\n" +
            "   droppable\n" +
            "   ng-update='updateObjects(id, from, to)'\n" +
            "   ng-create='createObject(id, to)'\n" +
            "   id='sortable'>\n" +
            "   <li ng-repeat='item in items track by item.id'>\n"+
            "       {{ item.name }}\n" +
            "   </li>\n" +
        "</ul>";
        
        $scope.updateObjects = function(from, to) {
            $scope.items.splice(to, 0, $scope.items.splice(from, 1)[0]);
        };

        $scope.createObject = function(id, to) {
            var object = _.findWhere($scope.objects, { id: +id });
            var newItem = angular.copy(object);
            newItem.id = Math.ceil(Math.random() * 1000);

            $scope.items.splice(to, 0, newItem);
        };
        
        $scope.deleteItem = function(itemId) {
            $scope.items = _.reject($scope.items, function(item) {
                return item.id == itemId; 
            });
        };
    }])
    
;})();