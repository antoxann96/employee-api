/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

	grunt.config.set("git-describe", {
		    "options": {
		      // Task-specific options go here.
		    },
		    "your_target": {
		      // Target-specific file lists and/or options go here.
		    },
		}
	);

	grunt.loadNpmTasks('grunt-git-describe');
};
