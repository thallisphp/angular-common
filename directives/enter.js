directives.directive('ngEnter', function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attr, ctrl) {
      elem.bind('keypress', function(e, ui){
        if (e.keyCode == '13') {
          scope.$apply(function(s) {
            s.$eval(attr.ngEnter);
          });
        }
      });
    }
  };
});
