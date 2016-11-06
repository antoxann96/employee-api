module.exports = function (grunt) {
    grunt.event.once('git-describe', function (rev) {
        grunt.log.writeln("Git Revision: " + rev);

        var versionObj = {
        	project: rev[1]
        };
        grunt.file.write("./version.json", JSON.stringify(versionObj));
    });    
};
