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
        stripBanners: false
      },
      bootstrap: {
        src: ['scripts/js/vendor/bootstrap/*.js'],
        dest: 'www/js/vendor/bootstrap.js'
      }
    },
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'www/js/main.min.js': 'scripts/js/main.js',
          'www/js/vendor/ga.min.js': 'scripts/js/vendor/ga.js',
          'www/js/vendor/jquery.min.js': 'scripts/js/vendor/jquery.js',
          'www/js/vendor/jquery.tablesorter.min.js': 'scripts/js/vendor/jquery.tablesorter.js',
          /* This one we pull after the concat has fired off */
          'www/js/vendor/bootstrap.min.js': '<%= concat.bootstrap.dest %>'
        }
      }      
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      // for now we don't jshint the scripts in vendor.
      build: ['scripts/js/*.js']
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
        options: {
          banner: '/* <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          "www/css/vendor/bootstrap.css": "styles/less/vendor/bootstrap/bootstrap.less",
          "www/css/main.css": "styles/less/main.less"
        }
      },
      dist: {
        options: {
          yuicompress: true,
          banner: '/* <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          "www/css/vendor/bootstrap.min.css": "styles/less/vendor/bootstrap/bootstrap.less",
          "www/css/main.min.css": "styles/less/main.less"
        }
      }
    },
    copy: {
      js: {
        files: [
          {
            expand: true, 
            flatten: true, 
            src: ['scripts/js/vendor/*.js'], 
            dest: 'www/js/vendor/'
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
            src: ['scripts/js/vendor/*.map'], 
            dest: 'www/js/vendor/'
          },
        ]
      },
      main: {
        files: [
          {
            expand: true, 
            flatten: true, 
            src: ['scripts/js/vendor/*.js'], 
            dest: 'www/js/vendor/'
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
            src: ['scripts/js/vendor/*.map'], 
            dest: 'www/js/vendor/'
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

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 
    ['clean', 'copy', 'concat', 'jade:dev', 'less:dev', 'connect', 'watch']
  );

  grunt.registerTask('dist', 
    ['clean', 'copy', 'concat', 'jade', 'less']
  );

};
