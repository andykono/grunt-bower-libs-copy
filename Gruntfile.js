/*
 * grunt-bower-libs-copy
 * https://github.com/andykono/grunt-bower-libs-copy
 *
 * Copyright (c) 2015 Andy Kononenko (andy.kono@gmail.com)
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.initConfig({
        bowerLibsCopy:{
            options: {
                srcDirectory: "<%= dirs.src %>",
                destDirectory: "<%= dirs.temp %>",
                configFile: "config.js",
                srcLibsDirectory: "assets/js/vendor/"
            }
        }
    });

    grunt.registerTask("bowerLibsCopy");
};
