(function() {
    
    "use strict";
    
    angular.module('common.utils', [])
    
    
    
    //
    // NOTE Upload
    // --------------------------------------------------
    
    .directive('upload', [function() {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                upload: '=',
                uploadOnError: '&',
                uploadOnSuccess: '&',
                ngModel: '=',
            },
            transclude: true,
            template: "<form style='margin: 0;' method='POST' enctype='multipart/form-data'>" +
                "<input type='file' name='{{ uploadName }}' style='display: none;'/>" +
                "<span style='float: left; position: relative;' class='fake-uploader' readonly='readonly' ng-model='avatar'>" +            
                    "<span ng-transclude></span>" +
                    "<strong ng-show='progress > 0' ng-class='{ \"text-success\": progress == 100, \"text-info\": progress < 100 }' style='width: {{ progress }}%'>{{ progress }}%</strong>" +
                "</span>" +
            "</form>",
            link: function($scope, element, attrs) {
                $scope.uploadName = attrs.uploadName || "file";
                $scope.uploadBtnLabel = attrs.uploadBtnLabel || "Choose File";
                $scope.uploadBtnClass = attrs.uploadBtnClass || "btn";
                $scope.uploadProgressClass = attrs.uploadProgressClass || "btn";

                $scope.progress = 0;
                $scope.avatar = '';

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

                    $form.attr('action', $scope.upload);

                    $scope.$apply(function() {
                        $scope.progress = 0;
                    });

                    $form.ajaxSubmit({
                        type: 'POST',
                        dataType: 'json',
                        uploadProgress: function(event, position, total, percentComplete) {
                            $scope.$apply(function() {
                                // upload the progress bar during the upload
                                $scope.progress = percentComplete;
                            });
                        },
                        error: function(event, statusText, responseText, form) {
                            // remove the action attribute from the form
                            $form.removeAttr('action');

                            $scope.$apply(function () {
                                $scope.uploadOnError({
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
                                $scope.ngModel = data.filename;
                            }

                            $scope.$apply(function () {
                                $scope.uploadOnSuccess({
                                    responseText: responseText,
                                });

                                $scope.progress = 0;
                            });
                        },
                    });
                });
            }
        };
    }])

    

    //
    // NOTE Confirm
    // --------------------------------------------------
    
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
    }])
    
    
    
    //
    // NOTE Popup
    // --------------------------------------------------
    
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
    }])

    
    
    //
    // NOTE ngBindHtmlUnsafe
    // --------------------------------------------------
    
    .directive('ngBindHtmlUnsafe', [function() {
        return function(scope, element, attr) {
            element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
            scope.$watch(attr.ngBindHtmlUnsafe, function ngBindHtmlUnsafeWatchAction(value) {
                element.html(value || '');
            });
        };
    }]);

}());