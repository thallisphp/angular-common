/*
 * Adapted from: http://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js
 *
 * Works nicely with the following styles:
 * textarea {
 *  resize: none;
 *	transition: 0.05s;
 *	-moz-transition: 0.05s;
 *	-webkit-transition: 0.05s;
 *	-o-transition: 0.05s;
 * }
 *
 * Usage: <textarea auto-grow></textarea>
 */
app.directive('autoResize', function() {
	return function(scope, element, attr){
		var minHeight = element[0].offsetHeight,
			paddingLeft = element.css('paddingLeft'),
			paddingRight = element.css('paddingRight');

		var $shadow = angular.element('<div></div>').css({
			position: 'absolute',
			top: -10000,
			left: -10000,
			width: element[0].offsetWidth - parseInt(paddingLeft ? paddingLeft : 0) - parseInt(paddingRight ? paddingRight : 0),
			fontSize: element.css('fontSize'),
			fontFamily: element.css('fontFamily'),
			lineHeight: element.css('lineHeight'),
			resize:     'none'
		});
		angular.element(document.body).append($shadow);

		var update = function() {
			var times = function(string, number) {
				for (var i = 0, r = ''; i < number; i++) {
					r += string;
				}
				return r;
			}

			var val = element.val().replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/&/g, '&amp;')
				.replace(/\n$/, '<br/>&nbsp;')
				.replace(/\n/g, '<br/>')
				.replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' ' });
			$shadow.html(val);

			element.css('height', Math.max($shadow[0].offsetHeight + 10 /* the "threshold" */, minHeight) + 'px');
		}

		element.bind('keyup keydown keypress change', update);
		update();
	}
});
