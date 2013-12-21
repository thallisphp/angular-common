/**

    This file simply includes all common modules if you need them all or you can modify it to include less or more.
    
    Then you just need to type `common` into your modules instead of listing them all.

*/

(function() {
    
    "use strict";
    
    angular.module('common.master', [
        'common.api',
        'common.confirm',
        'common.dateRange',
        'common.drag',
        'common.dragdrop',
        'common.mediaelement',
        'common.modal',
        'common.ngBindHtmlUnsafe',
        'common.print',
        'common.redactor',
        'common.skype',
        'common.strings',
        'common.time',
        'common.upload',
        'common.youtube'
    ])

;})();;
(function() {
    
    "use strict";
    
    angular.module('common.api', [])
    
    .factory('Api', ['$http', function($http) {
        /**
         * @api {private} encodeObject(obj); encodeObject()
         * @apiName encodeObject
         * @apiGroup API
         *
         * @apiParam {Object} obj The object to be converted into a http query string.
         *
         * @apiSuccess {String} str http query string.
         */
        function encodeObject(obj) {
            var str = "";
            for(var p in obj) {
                if (obj[p]) {
                    switch(typeof obj[p]) {
                    case 'boolean' :
                        str += p + '=' + parseInt(obj[p], 10) + "&";
                        break;
    
                    case 'number' :
                    case 'string' :
                        str += p + "=" + obj[p] + "&";
                        break;
    
                    case 'object' :
                        for (var i in obj[p]) {
                            if (obj[p][i]) {
                                str += p + "[" + encodeURIComponent(i) + "]=" + encodeURIComponent(obj[p][i]) + "&";
                            }
                        }
                        break;
                    }
                }
            }
    
            return str;
        }
        
        var base = '';
        var api = {};
        
        
        
        /**
         * @api {public} Api.setBase('/api/v2/'); setBase()
         * @apiName setBase
         * @apiGroup API
         *
         * @apiParam {String} newBase The new base url for all $http requests.
         *
         * @apiSuccess {Null} null
         */
        api.setBase = function(newBase) {
            base = newBase;
        };
        
        
        
        /**
         * @api {public} Api.get(url,data); get()
         * @apiName get
         * @apiGroup API
         *
         * @apiParam {String} url Get destination.
         * @apiParam {Object} data Data to be sent with request.
         *
         * @apiSuccess {Promise} promise Standard $http promise.
         */
        api.get = function(url, data){
            return $http.get(base + url + "?" + encodeObject(data));
        };
        
        
        
        /**
         * @api {public} Api.get(url,data); get()
         * @apiName get
         * @apiGroup API
         *
         * @apiParam {String} url Get destination.
         * @apiParam {Object} data Data to be sent with request.
         *
         * @apiSuccess {Promise} promise Standard $http promise.
         */
        api.post = function(url, data){
            return $http.post(base + url, data);
        };
        
        
        
        /**
         * @api {public} Api.get(url,data); get()
         * @apiName get
         * @apiGroup API
         *
         * @apiParam {String} url Get destination.
         * @apiParam {Object} data Data to be sent with request.
         *
         * @apiSuccess {Promise} promise Standard $http promise.
         */
        api.put = function(url, data){
            return $http.put(base + url, data);
        };
        
        
        
        /**
         * @api {public} Api.get(url,data); get()
         * @apiName get
         * @apiGroup API
         *
         * @apiParam {String} url Get destination.
         * @apiParam {Object} data Data to be sent with request.
         *
         * @apiSuccess {Promise} promise Standard $http promise.
         */
        api.delete = function(url, data){
            return $http.delete(base + url + "?" + encodeObject(data));
        };
        
        return api;
    }]);
    
})();;
(function() {
    
    "use strict";
    
    angular.module('common.confirm', [])

    .directive('confirm', ['$document', function($document) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var buttonId = Math.floor(Math.random() * 10000000000), 
                    confirmMessage = attrs.confirmMessage || "", 
                    confirmActionButton = attrs.confirmActionButton || "Yes",
                    confirmActionClass = attrs.confirmActionClass || "btn-danger",
                    confirmCancelButton = attrs.confirmCancelButton || "No",
                    confirmTitle = attrs.confirmTitle || "Confirm",
                    confirmPlacement = attrs.confirmPlacement || "top";
                
                attrs.buttonId = buttonId;
                
                var html = "<div class='popover-body' id='button-" + buttonId + "'>" +
                    "<span>" + confirmMessage + "</span>" +
                    "<span class='confirm-action-button btn " + confirmActionClass + "'>" + confirmActionButton + "</span> " + 
                    "<span class='confirm-cancel-button btn btn-default'>" + confirmCancelButton + "</span>" + 
                    "</div>";

                element.popover({
                    content: html,
                    html: true,
                    trigger: "manual",
                    title: confirmTitle,
                    placement: confirmPlacement,
                });
    
                element.bind('click', function(e) {
                    e.stopPropagation();
                    element.popover('show');
                    
                    var pop = $("#button-" + buttonId);
                    
                    pop.closest(".popover").click(function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    
                    pop.find('.confirm-action-button').click(function() {
                        // this closes popover and doesn't conflict with popup directive
                        pop.closest('.popover').remove();

                        scope.$apply(function() {
                            scope.$eval(attrs.confirm);
                        });
                    });
                    
                    // just hide the popover from view
                    pop.find('.confirm-cancel-button').click(function() {
                        $document.off('click.confirm.' + buttonId);
                        pop.closest('.popover').remove();
                    });
                    
                    // If you click the window excluding the popover close popover.
                    $document.on('click.confirm.' + buttonId, ":not(.popover, .popover *)", function() {
                        $document.off('click.confirm.' + buttonId);
                        pop.closest('.popover').remove();
                    });
                });
            }
        };
    }]);
    
})();;
(function() {

    "use strict";

    angular.module('common.dateRange', [])

    .directive('dateRange', ['$window', '$timeout', function ($window, $timeout) {
        return {
            restrict: 'A',
            scope: {
                dateRange: '=',
                ngUpdate: '&'
            },
            template: "<i class='icon-calendar'></i> <span></span> <b class='caret'></b>",
            link: function (scope, element) {
                scope.dateRangeOptions = {
                    ranges: {
                        'Today': [new Date(), new Date()],
                        'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                        'Last 7 Days': [moment().subtract('days', 6), new Date()],
                        'Last 30 Days': [moment().subtract('days', 29), new Date()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                    },
                    format: 'YYYY-MM-DD',
                    displayFormat: 'M/DD/YYYY',
                    separator: ' to ',
                    startDate: moment().subtract('days', 7).format("M/DD/YYYY"),
                    endDate: moment().format("M/DD/YYYY"),
                    locale: {
                        applyLabel: 'Submit',
                        fromLabel: 'From',
                        toLabel: 'To',
                        customRangeLabel: 'Custom Range',
                        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
                        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        firstDay: 1
                    },
                    showWeekNumbers: false,
                    buttonClasses: ['btn-danger'],
                    dateLimit: false
                };

                scope.dateRange = angular.extend(scope.dateRangeOptions, scope.dateRange);

                var displayStart = $window.moment(scope.dateRange.startDate).format(scope.dateRangeOptions.displayFormat);
                var displayEnd = $window.moment(scope.dateRange.endDate).format(scope.dateRangeOptions.displayFormat);

                $(element)
                    .find('span')
                    .html(displayStart + ' - ' + displayEnd);

                element.daterangepicker(scope.dateRange, function(start, end){
                    displayStart = start.format(scope.dateRangeOptions.displayFormat);
                    displayEnd = end.format(scope.dateRangeOptions.displayFormat);

                    $(element)
                        .find('span')
                        .html(displayStart + ' - ' + displayEnd);

                    start = start.format(scope.dateRangeOptions.format);
                    end = end.format(scope.dateRangeOptions.format);

                    $timeout(function() {
                        scope.ngUpdate({ start: start, end: end });
                    });
                });
            }
        };
    }]);

})();;
(function() {
    
    "use strict";
    
    angular.module('common.drag', [])
    
    // Would like to remove dependency on jqueryui
    // http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    .directive('drag', ['$timeout', function ($timeout) {
        return {
            scope: {
                drag: '=',
            },
            link: function (scope, element) {
                $(element).draggable({
                    stop: function(event, ui) {
                        $timeout(function() {
                            scope.drag.top = ui.position.top;
                            scope.drag.left = ui.position.left;
                        });
                    }
                });
            }
        };
    }]);

})();;
(function() {

    "use strict";

    angular.module('common.dragdrop', [])

    .factory('DragDropHandler', [function() {
        return {
            dragObject: undefined,
            addObject: function(object, objects, to) {
                objects.splice(to, 0, object);
            },
            moveObject: function(objects, from, to) {
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
                droppable: '=',
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
                                DragDropHandler.moveObject(scope.droppable, from, to);
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

;})();;
(function() {
    
    "use strict";
    
    angular.module('common.mediaelement', [])
    
    .directive('mediaelement', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                attrs.$observe('src', function() {
                    element.mediaelementplayer({
                        // if set, overrides <video width>
                        videoWidth: -1,
                        // if set, overrides <video height>
                        videoHeight: -1,
                        // width of audio player
                        audioWidth: 400,
                        // height of audio player
                        audioHeight: 50,
                        // initial volume when the player starts
                        startVolume: 0.5,
                        // useful for <audio> player loops
                        loop: false,
                        // enables Flash and Silverlight to resize to content size
                        enableAutosize: true,
                        // the order of controls you want on the control bar (and other plugins below)
                        features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
                        // Hide controls when playing and mouse is not over the video
                        alwaysShowControls: false,
                        // force iPad's native controls
                        iPadUseNativeControls: false,
                        // force iPhone's native controls
                        iPhoneUseNativeControls: false, 
                        // force Android's native controls
                        AndroidUseNativeControls: false,
                        // forces the hour marker (##:00:00)
                        alwaysShowHours: false,
                        // show framecount in timecode (##:00:00:00)
                        showTimecodeFrameCount: false,
                        // used when showTimecodeFrameCount is set to true
                        framesPerSecond: 25,
                        // turns keyboard support on and off for this instance
                        enableKeyboard: true,
                        // when this player starts, it will pause other players
                        pauseOtherPlayers: true,
                        // array of keyboard commands
                        keyActions: []
                        
                    });
                });
            }
        };
    }]);
    
})();
;
(function() {
    
    "use strict";
    
    angular.module('common.modal', [])
        
    .directive('modal', ['Modal', function(Modal){
        return {
            restrict: 'E,A',
            link: function postLink(scope, element, attrs) {
                element.bind( "click", function(){
                    Modal.load(attrs.modal, scope);
                });
            }
        };
    }])

    .factory('Modal', ['$http', '$compile', function ($http, $compile) {
        // Got the idea for this from a post I found. Tried to not have to make this
        // object but couldn't think of a way to get around this
        var modalService = {};
    
        // Get the popup
        modalService.getModal = function() {
            $('.modal-service').remove();
    
            // the popup-service class lets us tag this modal for future manipulation
            modalService.modalElement = $('<div class="modal-service modal fade"><div class="modal-dialog"><div class="modal-content"></div></div></div>' );
            modalService.modalElement.appendTo('body');
    
            return modalService.modalElement;
        };
    
        modalService.compileAndRunPopup = function (modal, scope) {
            $compile(modal)(scope);
            modal.modal();
        };
    
    
        // Loads the modal
        modalService.load = function(url, scope) {
            $http.get(url).success(function (data) {
                var modal = modalService.getModal();
    
                modal.find('.modal-content').html(data);
                modalService.compileAndRunPopup(modal, scope);
    
                modal.on('hidden', function() {
                    modal.remove();
                });
    
                modal.find(".btn-cancel").click(function () {
                    modalService.close();
                });
            });
        };
    
        modalService.close = function() {
            var modal = $('.modal-service');
            if (modal) {
                modal.modal('hide');
            }
        };
    
        return modalService;
    }]);
    
})();;
(function() {
    
    "use strict";
    
    angular.module('common.ngBindHtmlUnsafe', [])
    
    .directive('ngBindHtmlUnsafe', [function() {
        return function(scope, element, attr) {
            element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
            scope.$watch(attr.ngBindHtmlUnsafe, function ngBindHtmlUnsafeWatchAction(value) {
                element.html(value || '');
            });
        };
    }]);

}());;
(function() {

    "use strict";

    angular.module('common.print', [])

    .directive('print', ['$timeout', function($timeout) {
        return {
            link: function(scope, element, attrs) {
                function getHtml() {
                    return $(attrs.print).html();
                }

                element.click(function() {
                    var data = getHtml();
                    var mywindow = window.open('', attrs.printTitle, 'height=400,width=800');

                    mywindow.document.write('<html><head><title>' + attrs.printTitle + '</title>');
                    mywindow.document.write('<link rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css" type="text/css" />');
                    mywindow.document.write('</head><body >' + data + '</body></html>');
                    mywindow.print();

                    $timeout(function() {
                        mywindow.close();
                    }, 10);

                    return true;
                });
            }
        };
    }]);

})();;
(function() {
    
    "use strict";
    
    angular.module('common.redactor', [])
    
    // https://github.com/whatever-company/angular-redactor
    .directive("redactor", ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, controller) {
                var instance,
                    initialised = false;

                // redactor
                instance = element.redactor({
                    imageGetJson: '/api/v1/redactor/images',
                    imageUpload: '/api/v1/redactor/image?resource=true',
                    fileUpload: '/api/v1/redactor/file',
                    plugins: ['fontcolor', 'fullscreen'],
                    syncAfterCallback: function(html) {
                        // view -> model
                        if (initialised && controller.$viewValue !== html) {
                            $timeout(function () {
                                controller.$setViewValue(html);
                            });
                        }
                    }
                }).redactor('getObject');

                // model -> view
                controller.$render = function () {
                    instance.set(controller.$viewValue || "");
                    initialised = true;
                };

                // destroy
                $scope.$on('$destroy', function () {
                    instance.destroy();
                    instance = null;
                });
            }
        };
    }]);
    
})();
;
(function() {

    'use strict';

    angular.module('common.skype', [])

    .filter('skype', [function() {
        return function(value) {
            if (!value) {
                return value;
            }

            value = String(value).replace(/\D/g, '');

            if (value[0] === '1') {
                value = "+" + value;
            }

            if (value[0] !== '+' && value[1] !== '1') {
                value = "+1" + value;
            }

            return 'skype:' + value + '?call';
        };
    }]);

})();;
(function() {

    "use strict";

    angular.module('common.strings', [])



    //
    // NOTE Title Case
    // --------------------------------------------------

    .filter('titleCase', function() {
        var titleCaseFilter = function(input) {
            if (!input) {
                return;
            }

            var words = input.split(' ');
            for (var i = 0; i < words.length; i++) {
                words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
            }

            return words.join(' ');
        };

        return titleCaseFilter;
    })



    //
    // NOTE Lower Case
    // --------------------------------------------------

    .filter('lowerCase', function() {
        var titleCaseFilter = function(input) {
            var words = input.split(' ');
            for (var i = 0; i < words.length; i++) {
                words[i] = words[i].charAt(0).toLowerCase() + words[i].slice(1);
            }

            return words.join(' ');
        };
        return titleCaseFilter;
    })



    //
    // NOTE nl2br
    // --------------------------------------------------

    .filter('nl2br', [function(){
        return function (value) {
            if (!value) {
                return value;
            }

            value = value + '';

            return value.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
        };
    }])



    //
    // NOTE Truncate
    // --------------------------------------------------

    /**
     * Truncate Filter
     * @Param text
     * @Param length, default is 10
     * @Param end, default is "..."
     * @return string
     *
     * Usage
     * var myText = "This is an example.";
     *
     * {{myText|Truncate}}
     * {{myText|Truncate:5}}
     * {{myText|Truncate:25:" ->"}}
     *
     * Output
     * "This is..."
     * "Th..."
     * "This is an e ->"
     */
    .filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length)) {
                length = 10;
            }

            if (end === undefined) {
                end = "...";
            }

            if (!text) {
                return text;
            }

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            } else {
                return String(text).substring(0, length-end.length) + end;
            }
        };
    })



    //
    // NOTE encodeURIComponent
    // --------------------------------------------------

    .filter('encodeURIComponent', function() {
        return window.encodeURIComponent;
    })



    //
    // NOTE 〉Slugify
    // --------------------------------------------------

    .directive('slugify', ['$parse', function($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.ngModel, function(value) {
                    if (!value) {
                        return;
                    }

                    $parse(attrs.ngModel).assign(scope, value.toLowerCase().replace(/[\W\s]/g, '-'));
                });
            }
        };
    }]);

})();;
(function() {

    "use strict";

    angular.module('common.time', [])

    .filter('moment', [function() {
        return function (value, format) {
            return moment(value).format(format);
        };
    }])

    .filter('fromNow', [function() {
        return function(date) {
            return moment(date).fromNow();
        };
    }])

    .filter('smallFromNow', [function() {
        return function(input, p_allowFuture) {
            var substitute = function (stringOrFunction, number, strings) {
                    var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
                    var value = (strings.numbers && strings.numbers[number]) || number;
                    return string.replace(/%d/i, value);
                },
                nowTime = (new Date()).getTime(),
                date = (new Date(input)).getTime(),
                //refreshMillis= 6e4, //A minute
                allowFuture = p_allowFuture || false,
                strings= {
                    prefixAgo: null,
                    prefixFromNow: null,
                    suffixAgo: "",
                    suffixFromNow: "",
                    seconds: "1m",
                    minute: "1m",
                    minutes: "%dm",
                    hour: "1h",
                    hours: "%dh",
                    day: "a day",
                    days: "%d days",
                    month: "1mon",
                    months: "%dmon",
                    year: "1y",
                    years: "%dy"
                },
                dateDifference = nowTime - date,
                words,
                seconds = Math.abs(dateDifference) / 1000,
                minutes = seconds / 60,
                hours = minutes / 60,
                days = hours / 24,
                years = days / 365,
                separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator,

                // var strings = this.settings.strings;
                prefix = strings.prefixAgo,
                suffix = strings.suffixAgo;

            if (allowFuture) {
                if (dateDifference < 0) {
                    prefix = strings.prefixFromNow;
                    suffix = strings.suffixFromNow;
                }
            }

            words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
            seconds < 90 && substitute(strings.minute, 1, strings) ||
            minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
            minutes < 90 && substitute(strings.hour, 1, strings) ||
            hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
            hours < 42 && substitute(strings.day, 1, strings) ||
            days < 30 && substitute(strings.days, Math.round(days), strings) ||
            days < 45 && substitute(strings.month, 1, strings) ||
            days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
            years < 1.5 && substitute(strings.year, 1, strings) ||
            substitute(strings.years, Math.round(years), strings);

            return $.trim([prefix, words, suffix].join(separator));
        };
    }]);

})();;
(function() {
    
    "use strict";
    
    angular.module('common.upload', [])
    
    .directive('upload', ['$timeout', function($timeout) {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                upload: '=',
                ngModel: '=',
                ngChange: '&',
                ngError: '&'
            },
            transclude: true,
            template: "<form style='margin: 0;' method='POST' enctype='multipart/form-data'>" +
                "<input type='file' name='{{ uploadName }}' style='display: none;'/>" +
                "<span style='float: left; position: relative;' class='fake-uploader' readonly='readonly' ng-model='avatar'>" +            
                    "<span ng-transclude></span>" +
                    "<strong ng-show='progress > 0' ng-class='{ \"text-success\": progress == 100, \"text-info\": progress < 100 }' style='width: {{ progress }}%'>{{ progress }}%</strong>" +
                "</span>" +
            "</form>",
            link: function(scope, element, attrs) {
                scope.uploadName = attrs.uploadName || "file";

                scope.progress = 0;
                scope.avatar = '';

                element.find('.fake-uploader').click(function() {
                    element.find('input[type="file"]').click();
                });

                element.find('.progress').css({
                    width: element.find('.fake-uploader').width
                });
                
                element.find('input').change(function() {
                    var $this = $(this);
                    var $form = $this.parents('form');
                
                    if ($this.val() === '') {
                        return false;
                    }

                    $form.attr('action', scope.upload);

                    scope.$apply(function() {
                        scope.progress = 0;
                    });

                    $form.ajaxSubmit({
                        type: 'POST',
                        dataType: 'json',
                        uploadProgress: function(event, position, total, percentComplete) {
                            scope.$apply(function() {
                                // upload the progress bar during the upload
                                scope.progress = percentComplete;
                            });
                        },
                        error: function(event, statusText, responseText, form) {
                            // remove the action attribute from the form
                            $form.removeAttr('action');

                            $timeout(function () {
                                scope.ngError({
                                    event: event,
                                    responseText: responseText,
                                    statusText: statusText,
                                    form: form,
                                });
                            });
                        },
                        // responseText, statusText, xhr, form
                        success: function(responseText) {
                            // remove the action attribute from the form
                            $form.removeAttr('action');
                            var data = angular.fromJson(responseText);

                            if (data.filename !== undefined) {
                                scope.ngModel = data.filename;
                            }

                            $timeout(function () {
                                scope.ngChange({ responseText: responseText });
                                scope.progress = 0;
                            });
                        },
                    });
                });
            }
        };
    }]);

})();;
(function() {

    "use strict";

    angular.module('common.youtube', [])


    .service('Youtube', [function() {
        var regex = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;

        return {
            regex: function() {
                return regex;
            }
        };
    }])

    .filter('youtubeIframe', ['$filter', 'Youtube', function($filter, Youtube){
        return function (value) {
            if (!value) {
                return value;
            }

            var videoid = value.match(Youtube.regex());

            if (videoid === null) {
                return "";
            }

            return "//www.youtube.com/embed/" + videoid[1];
        };
    }])

    .filter('youtubeImage', ['$filter', 'Youtube', function($filter, Youtube){
        return function (value) {
            if (!value) {
                return value;
            }

            var videoid = value.match(Youtube.regex());

            if (videoid === null) {
                return "";
            }

            return "//i2.ytimg.com/vi/" + videoid[1] + "/mqdefault.jpg";
        };
    }]);

})();
