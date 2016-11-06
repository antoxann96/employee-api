module.exports = function(grunt) {

    grunt.config.set('jshint', {
          all: ['Gruntfile.js']

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};
