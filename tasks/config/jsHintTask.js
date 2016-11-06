module.exports = function(grunt) {

    grunt.config.set('jshint', {
        jshint: {
              options: {
                jshintrc: '.jshintrc',
                require
              },
              all: [ 'Gruntfile.js'
              ]
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};
