module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 3456,
          base: 'www'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'scripts/js/bootstrap/transition.js',
          'scripts/js/bootstrap/alert.js',
          'scripts/js/bootstrap/button.js',
          'scripts/js/bootstrap/carousel.js',
          'scripts/js/bootstrap/collapse.js',
          'scripts/js/bootstrap/dropdown.js',
          'scripts/js/bootstrap/modal.js',
          'scripts/js/bootstrap/tooltip.js',
          'scripts/js/bootstrap/popover.js',
          'scripts/js/bootstrap/scrollspy.js',
          'scripts/js/bootstrap/tab.js',
          'scripts/js/bootstrap/affix.js'
        ],
        dest: 'www/js/bootstrap.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'www/js/bootstrap.min.js'
      }
    },
    jade: {
      dev: {
        options: {
          pretty: true,
        },
        files: [
          {
            expand: true, 
            flatten: true, 
            src: 'jade/pages/*.jade', 
            dest: 'www/', 
            ext: '.html'
          },
        ]
      },
      dist: {
        files: [
          {
            expand: true, 
            flatten: true, 
            src: 'jade/pages/*.jade', 
            dest: 'www/', 
            ext: '.html'
          },
        ]
      }
    },
    clean: {
      build: ["www/*"] 
    },
    watch: { 
      jade: {
        files: [
          'jade/**/**.jade', 
        ],
        tasks: ['jade:dev'],
      },
      less: {
        files: [
          'styles/less/**/*.less', 
        ],
        tasks: ['less:dev'],
      },
      scripts: {
        files: [
          'scripts/js/**/*.js',
        ],
        tasks: ['copy:js'],
      }
    },
    less: { 
      dev: {
        files: {
          "www/css/bootstrap.css": "styles/less/bootstrap/bootstrap.less",
          "www/css/main.css": "styles/less/main.less"
        }
      },
      dist: {
        options: {
          yuicompress: true
        },
        files: {
          "www/css/bootstrap.css": "styles/less/bootstrap/bootstrap.less",
          "www/css/main.css": "styles/less/main.less"
        }
      }
    },
    copy: {
      js: {
        files: [
          {
            expand: true, 
            flatten: true, 
            src: ['scripts/js/jquery-1.10.2.min.js'], 
            dest: 'www/js/'
          },
          {
            expand: true, 
            flatten: true, 
            src: ['scripts/js/*.js'], 
            dest: 'www/js/'
          },
          {
            expand: true, 
            flatten: true, 
            src: ['scripts/js/*.map'], 
            dest: 'www/js/'
          },
        ]
      },
      main: {
        files: [
          {
            expand: true, 
            flatten: true, 
            src: ['scripts/js/jquery-1.10.2.min.js'], 
            dest: 'www/js/'
          },
          {
            expand: true, 
            flatten: true, 
            src: ['scripts/js/*.js'], 
            dest: 'www/js/'
          },
          {
            expand: true, 
            flatten: true, 
            src: ['scripts/js/*.map'], 
            dest: 'www/js/'
          },
          {
            expand: true, 
            flatten: true, 
            src: ['images/favicon.ico'], 
            dest: 'www/'
          },
          {
            expand: true,
            flatten: true,
            src: ['images/*'],
            dest: "www/img/"
          },
        ]
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', [
    'clean', 
    'copy',
    'concat',
    'jade:dev',
    'less:dev',
    'connect',
    'watch'
  ]);
};
