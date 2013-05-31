directivesModule.directive("redactor", function () {
  var linkFn = function (scope, el, attr, ngModel) {
		scope.redactor = el.redactor({
			focus: false,
			callback: function (o) {
				el.keydown(function () {
					scope.$apply(ngModel.$setViewValue(o.getCode()));
				});
			}
		});
	}
	return {
		require: '?ngModel',
		link: linkFn,
		restrict: 'A',
	};
});
