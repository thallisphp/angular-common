(function() {

    'use strict';

    module.exports = function(grunt) {

        grunt.initConfig({
            concat: {
                options: {
                    separator: "\n\n",
                },
                javascript: {
                    src: [
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
                        './modules/youtube/youtube.js',

                        './modules/app.js',
                        './modules/api/demo/demo-api.js',
                        './modules/confirm/demo/demo-confirm.js',
                        "./modules/dateRange/demo/demo-daterange.js",
                        "./modules/drag/demo/demo-drag.js",
                        "./modules/dragdrop/demo/demo-dragdrop.js",
                        "./modules/fullscreen/demo/demo-fullscreen.js",
                        "./modules/mediaelement/demo/demo-mediaelement.js",
                        "./modules/modal/demo/demo-modal.js",
                        "./modules/ngBindHtmlUnsafe/demo/demo-ngbindhtmlunsafe.js",
                        "./modules/print/demo/demo-print.js",
                        "./modules/redactor/demo/demo-redactor.js",
                        "./modules/skype/demo/demo-skype.js",
                        "./modules/strings/demo/demo-strings.js",
                        "./modules/time/demo/demo-time.js",
                        "./modules/upload/demo/demo-upload.js",
                        "./modules/youtube/demo/demo-youtube.js"
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
            karma: {
                options: {
                    configFile: 'karma.conf.js'
                },
                continuous: {
                    singleRun: true,
                    browsers: ['PhantomJS']
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-karma');

        grunt.registerTask('default', [
            'test:continuous',
            'concat:javascript',
            'uglify',
        ]);

        grunt.registerTask('test', ['karma']);
    };

})();