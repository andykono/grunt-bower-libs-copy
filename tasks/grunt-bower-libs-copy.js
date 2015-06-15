/*
 * task for copy external libs installed with bower
 * used config.js for needed libs processing
 *
 * Copyright (c) 2015 Andy Kononenko (andy.kono@gmail.com)
 * Licensed under the MIT license.
 */
"use strict";
module.exports = function (grunt) {

    // Utilities
    var _ = require("lodash");

    var processString = function(string, options){
        var part = options.srcLibsDirectory;
        if(string.indexOf(part)>0){
            var libData = string.split(":"),
                libNormalizedPath = libData[1].trim().replace(/[",]/g,""),
                bowerLibPath = getBowerVersionPath(libNormalizedPath, options);
            //copy this lib
            grunt.file.copy(options.srcDirectory+"/"+libNormalizedPath+".js", options.destDirectory+"/"+bowerLibPath+".js");
            //set path updated line in new config.js
            return  libData[0]+": \""+ bowerLibPath +"\",";
        }
        return string;
    };

    var getBowerVersionPath = function(pathToLib, options){
        var part = options.srcLibsDirectory,
            pathArray = pathToLib.replace(part,"").split("/"),
            libData = null;
        try{
            libData = grunt.file.readJSON(options.srcDirectory+"/"+part+pathArray[0]+"/.bower.json");
            pathArray[0] += "/v"+ libData.version;
        }catch (e){
            grunt.log.error("Err: read file .bower.json in path: "+pathToLib);
            return pathToLib;
        }
        return part + pathArray.join("/");
    };

    grunt.registerTask("bowerLibsCopy", "copy external libs installed with bower and update path in config.js", function () {
        var options = this.options();
        //get config data
        grunt.file.copy(options.srcDirectory +"/"+ options.configFile,options.destDirectory +"/"+ options.configFile,{
            process: function(fileContent){
                var content = [];
                _(fileContent.split("\r\n")).each(function(line){
                    content.push(processString(line, options));
                });
                return content.join("\r\n");
            }
        });
    });
};