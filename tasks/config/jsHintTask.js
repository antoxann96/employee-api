module.exports = function(grunt) {

    grunt.config.set('jsHintTask', {
        test: {
            options: {
              jshintrc: '.jshintrc'
            },
            all: [
              '!node_modules/**',
              '!libs/**'
            ]
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};
