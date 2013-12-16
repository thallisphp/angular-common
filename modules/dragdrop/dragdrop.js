(function() {
    
    "use strict";
    
    angular.module('common.dragdrop', [])
    
    .directive('draggable', [function(){
        return {
            link: function(scope, element, attrs){          
                element.draggable({
                    connectToSortable: attrs.draggableTarget,
                    helper: "clone",
                    revert: "invalid"
                });

                element.disableSelection();
            }
        };
    }])

    .directive('droppable', [function(){
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
                                    id: ui.item.attr('draggable'),
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