module.exports = function (grunt) {
    grunt.registerTask('jshint', [
	  options: {
	    jshintrc: '.jshintrc',
	    reporter: require('grunt-contrib-jshint')
	  },
	  all: [
	    '!node_modules/**',
	    '!libs/**'
	  ]
    ]);
};
