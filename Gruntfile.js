(function() {

    'use strict';

    module.exports = function(grunt) {
        grunt.initConfig({
            concat: {
                options: {
                    separator: ";\n",
                },
                javascript: {
                    src: [
                        './modules/common/common.js',
                        './modules/api/api.js',
                        './modules/confirm/confirm.js',
                        './modules/dateRange/dateRange.js',
                        './modules/drag/drag.js',
                        './modules/dragdrop/dragdrop.js',
                        './modules/fullscreen/fullscreen.js',
                        './modules/mediaelement/mediaelement.js',
                        './modules/modal/modal.js',
                        './modules/ngBindHtmlUnsafe/ngBindHtmlUnsafe.js',
                        './modules/print/print.js',
                        './modules/redactor/redactor.js',
                        './modules/skype/skype.js',
                        './modules/strings/strings.js',
                        './modules/time/time.js',
                        './modules/upload/upload.js',
                        './modules/youtube/youtube.js'
                    ],
                    dest: './build/angular-common.js'
                }
            },
            uglify: {
                dist: {
                    files: {
                        './build/angular-common.min.js': './build/angular-common.js'
                    }
                }
            },
        });

        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-uglify');

        grunt.registerTask('default', [
            'concat:javascript',
            'uglify',
        ]);
    };

})();
