'use strict';

module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Configurable paths for the application
	var appConfig = {
	    app : require('./bower.json').appPath || './',
	    dist : 'src/main/resources/static',
	    bower_src : 'bower_components'
	};

	// Project configuration.
	grunt.initConfig({

	    // Project settings
	    app : appConfig,

	    pkg : grunt.file.readJSON('bower.json'),

	    uglify : {
	        options : {
		        banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	        },
	        build : {
	            src : '<%= app.dist %>/js/*.js',
	            dest : '<%= app.dist %>/assets/js/<%= pkg.name %>.min.js'
	        }
	    },

	    cssmin : {
	        options : {
	            shorthandCompacting : false,
	            roundingPrecision : -1
	        },
	        target : {
		        files : {
		        	'<%= app.dist %>/assets/css/<%= pkg.name %>.min.css' : [ '<%= app.dist %>/css/*.css' ]
		        }
	        }
	    },

	    clean : {
		    dist : '<%= app.dist %>/assets'
	    },

	    copy : {
	        jquery : {
		        files : [ {
		            expand : true,
		            dest : '<%= app.dist %>/assets/js',
		            cwd : '<%= app.bower_src %>/jquery/dist',
		            src : [ '*.min.js' ]
		        } ]
	        },
	        bootstrap : {
		        files : [ {
		            expand : true,
		            dest : '<%= app.dist %>/assets/css',
		            cwd : '<%= app.bower_src %>/bootstrap/dist/css',
		            src : [ '*.min.css' ]
		        }, {
		            expand : true,
		            dest : '<%= app.dist %>/assets/js',
		            cwd : '<%= app.bower_src %>/bootstrap/dist/js',
		            src : [ '*.min.js' ]
		        }, {
		            expand : true,
		            dest : '<%= app.dist %>/assets/fonts',
		            cwd : '<%= app.bower_src %>/bootstrap/dist/fonts',
		            src : [ 'glyphicons-halflings-regular.*' ]
		        } ]
	        },
	        angular : {
		        files : [ {
		            expand : true,
		            dest : '<%= app.dist %>/assets/js',
		            cwd : '<%= app.bower_src %>/angular',
		            src : [ '*.min.js' ]
		        }, {
		            expand : true,
		            dest : '<%= app.dist %>/assets/js',
		            cwd : '<%= app.bower_src %>/angular-aria',
		            src : [ '*.min.js' ]
		        }, {
		            expand : true,
		            dest : '<%= app.dist %>/assets/js',
		            cwd : '<%= app.bower_src %>/angular-animate',
		            src : [ '*.min.js' ]
		        }, {
		            expand : true,
		            dest : '<%= app.dist %>/assets/js',
		            cwd : '<%= app.bower_src %>/angular-messages',
		            src : [ '*.min.js' ]
		        }, {
		            expand : true,
		            dest : '<%= app.dist %>/assets/js',
		            cwd : '<%= app.bower_src %>/angular-material',
		            src : [ '*.min.js' ]
		        }, {
		            expand : true,
		            dest : '<%= app.dist %>/assets/css',
		            cwd : '<%= app.bower_src %>/angular-material',
		            src : [ '*.min.css' ]
		        } ]
	        }
	    }
	});

	// Default task(s).
	grunt.registerTask('default', [ 'clean', 'copy', 'uglify', 'cssmin' ]);

};