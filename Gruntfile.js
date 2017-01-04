module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                src: [
                    'js/libs/*.js', // Все JS в папке libs
                    'js/main.js'  // Конкретный файл
                ],
                dest: 'js/build/production.js',
            },
            css: {
              src: [
                "css/libs/*.css",
                "css/style.css",
                "css/process.css"
              ],
              dest: "css/build.css"
            }
        },
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }

        },
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1,
            processImport: false
          },
          target: {
            files: {
              'css/build.min.css': 'css/build.css'
            }
          }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images-compressed/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },
        less: {
          development: {
            files: {
              'css/process.css': 'less/process.less'
            }
          }
        },
        uncss: {
          dist: {
            files: {
              'css/tidy.css': ['index.html', 'res.html']
            }
          }
        },
        handlebars: {
          compile: {
            options: {
              namespace: 'JST'
            },
            files: {
              'js/handlebars.js': 'js/handlebars.hbs'
            }
          }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: [
                    'sass/**'
                ],
                tasks: ['sass', 'concat:css'],
                options: {
                    spawn: false,
                }
            },
            less: {
                files: [
                    'less/**'
                ],
                tasks: ['less', 'concat:css', 'cssmin'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-handlebars')

    grunt.registerTask('default', ['sass', 'less', 'concat', 'uglify', 'cssmin', 'imagemin']);

};