(function() {
    
    "use strict";
    
    angular.module('common.dragdrop', [])
    
    .factory('DragDropHandler', [function() {
        return {
            dragObject: undefined,
            addObject: function(object, objects, to) {
                objects.splice(to, 0, object);  
            },
            updateObjects: function(objects, to, from) {
                objects.splice(to, 0, objects.splice(from, 1)[0]);
            }
        };
    }])
    
    .directive('draggable', ['DragDropHandler', function(DragDropHandler) {
        return {
            scope: {
                draggable: '=' 
            },
            link: function(scope, element, attrs){          
                element.draggable({
                    connectToSortable: attrs.draggableTarget,
                    helper: "clone",
                    revert: "invalid",
                    start: function() {
                        DragDropHandler.dragObject = scope.draggable;
                    },
                    stop: function() {
                        DragDropHandler.dragObject = undefined;   
                    }
                });

                element.disableSelection();
            }
        };
    }])

    .directive('droppable', ['DragDropHandler', function(DragDropHandler) {
        return {
            scope: {
                ngUpdate: '&',
                ngCreate: '&'
            },
            link: function(scope, element, attrs){
                element.sortable();
                element.disableSelection();

                element.on("sortdeactivate", function(event, ui) { 
                    var from = angular.element(ui.item).scope().$index;
                    var to = element.children().index(ui.item);
                    
                    if (to >= 0 ){
                        scope.$apply(function(){
                            if (from >= 0) {
                                scope.ngUpdate({
                                    from: from,
                                    to: to
                                });
                            } else {
                                scope.ngCreate({
                                    object: DragDropHandler.dragObject,
                                    to: to
                                });

                                ui.item.remove();
                            }
                        });
                    }
                });
            }
        };
    }])

;})();