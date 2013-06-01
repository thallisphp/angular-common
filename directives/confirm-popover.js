directives.directive('confirmButton', function($document) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var buttonId, html, message, nope, title, yep;

      buttonId = Math.floor(Math.random() * 10000000000);

      attrs.buttonId = buttonId;

      message = attrs.message || "";
      yep = attrs.yes || "Yes";
      nope = attrs.no || "No";
      title = attrs.title || "Confirm";

      html = "<div id=\"button-" + buttonId + "\"> \
        <span class=\"confirmbutton-msg\">" + message + "</span> \
        <button class=\"confirmbutton-yes btn btn-danger\">" + yep + "</button> \
        <button class=\"confirmbutton-no btn\">" + nope + "</button> \
      </div>";

      element.popover({
        content: html,
        html: true,
        trigger: "manual",
        title: title
      });

      return element.bind('click', function(e) {
        var dontBubble, pop;
        dontBubble = true;

        e.stopPropagation();

        element.popover('show');

        pop = $("#button-" + buttonId);

        pop.closest(".popover").click(function(e) {
          if (dontBubble) {
            e.stopPropagation();
          }
        });

        pop.find('.confirmbutton-yes').click(function(e) {
          dontBubble = false;

          scope.$apply(function(s) {
            s.$eval(attrs.confirmButton);
          });
        });

        pop.find('.confirmbutton-no').click(function(e) {
          dontBubble = false;
          $document.off('click.confirmbutton.' + buttonId);
          element.popover('hide');
        });

        $document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function() {
          $document.off('click.confirmbutton.' + buttonId);
          element.popover('hide');
        });
      });
    }
  };
});
