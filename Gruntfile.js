module.exports = function(grunt){

	grunt.initConfig({
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
		      expand: true,
		      cwd: '1_HTML/',
		      src: ['*.html'],
		      dest: '9_DIST/'
		    }]
      }
    },

		cssmin: {
			options: {
	        keepSpecialComments: 0
	    },
		  target: {
		    files: [{
		      expand: true,
		      cwd: '2_CSS/',
		      src: ['*.css'],
		      dest: '9_DIST/css'
		    }]
		  }
		},

    uglify: {
      options: {
        preserveComments: 'some',
        report: false
      },
      my_target: {
        files: [{
          expand: true,
          cwd: '4_JS/',
          src: ['*.js'],
          dest: '9_DIST/js'
        }]
      }
    },

		concat: {
	    css: {
	      src: ['9_DIST/css/*.css', '!9_DIST/css/style.css'],
	      dest: '9_DIST/css/style.css',
	    },
			js: {
				options:{
					separator:';',
				},
				src: ['9_DIST/js/*.js', '!9_DIST/js/script.js'],
				dest: '9_DIST/js/script.js',
			},
		},

    responsive_images: {
      myTask: {
        options: {
          aspectRatio: true,
          upscale: true,
          gravity: "center",
          quality: 60,
          /*sharpen: {
            sigma: 1,
            radius: 2
          },*/
          sizes: [{
            width: 320,
            height: 240
          },{
            name: 'large',
            width: 640
          },{
            name: "large",
            width: 1024,
            suffix: "_x2"
          }]
        },
        files: [{
          expand: true,
          src: ['**/*.{jpg,gif,png}'],
          cwd: '3_IMG/',
          dest: '9_DIST/img/'
        }]
      }
    },

    connect: {
      server: {
        options: {
          open: true,
          port: 9001,
          base: '9_DIST/'
        }
      }
    },

    watch: {
      html: {
        files: ['1_HTML/*'],
        tasks: ['newer:htmlmin'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      css: {
        files: ['2_CSS/*'],
        tasks: ['newer:cssmin','newer:concat:css'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      imgs: {
        files: ['3_IMG/*'],
        tasks: ['newer:responsive_images'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      js: {
        files: ['4_JS/*'],
        tasks: ['newer:uglify','newer:concat:js'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
    },
	});

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['newer:htmlmin','newer:cssmin','newer:uglify','newer:concat:css','newer:concat:js','newer:responsive_images','connect','watch']);
};
