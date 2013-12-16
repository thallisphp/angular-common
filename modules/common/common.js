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

;})();
