/*
http://stackoverflow.com/a/15306969/1069899

HTML View:
<textarea ui-redactor='{minHeight: 500}' ng-model='content'></textarea>
*/
directives.directive("redactor", function(){
  return {
    require: "ngModel",
    link: function(scope, elm, attrs, ngModelCtrl) {
      var apply, expression, getVal, options, redactor;
      redactor = null;
      getVal = function() {
        return redactor != null ? redactor.getCode() : void 0;
      };
      apply = function() {
        ngModelCtrl.$pristine = false;
        return scope.$apply();
      };
      options = {
        execCommandCallback: apply,
        keydownCallback: apply,
        keyupCallback: apply
      };
      scope.$watch(getVal, function(newVal) {
        if (!ngModelCtrl.$pristine) {
          return ngModelCtrl.$setViewValue(newVal);
        }
      });
      ngModelCtrl.$render = function() {
        return redactor != null ? redactor.setCode(ngModelCtrl.$viewValue || '') : void 0;
      };
      expression = attrs.uiRedactor ? scope.$eval(attrs.uiRedactor) : {};
      angular.extend(options, expression);
      return setTimeout(function() {
        return redactor = elm.redactor(options);
      });
    }
  };
});
