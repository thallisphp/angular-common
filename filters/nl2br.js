filters.filter('nl2br', function($filter){
  return function (value) {
	  var breakTag = '<br>';

	  return (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}
});
