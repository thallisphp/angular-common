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
                    lang: 'pt_br',
                    buttons: [
                    //  'html',
                    //  '|',
                        'formatting',
                        '|',
                        'bold',
                        'italic',
                        'deleted',
                        '|',
                        'unorderedlist',
                        'orderedlist',
                        'outdent',
                        'indent',
                        '|',
                    //  'image',
                        'video',
                        'file',
                        'table',
                        'link',
                        '|', 
                        'alignment',
                        '|',
                        'horizontalrule'
                    ],
                //  imageGetJson: '/api/v1/redactor/images',
                //  imageUpload: '/api/v1/redactor/image?resource=true',
                //  fileUpload: '/api/v1/redactor/file',
                    plugins: [
                        'fontcolor',
                        'fullscreen',
                        'fontsize'
                    ],
                    deniedTags: [
                        'html',
                        'head',
                        'link',
                        'body',
                        'meta',
                        'script',
                        'style',
                        'applet',
                        'video',
                        'audio'
                    ],
                    mobile: false,
                    convertImageLinks: true,
                    convertVideoLinks: true,
                    linkAnchor: false,
                    linkNofollow: true,
                    dragUpload: false,
                    pastePlainText: true,
                    tabSpaces: 0,
                    linkSize: 20,
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
