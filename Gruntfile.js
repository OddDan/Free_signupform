module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      app: {
        files: [{
          expand: true,
          cwd: 'Signup_form/assets/sass',
          src: ['*.scss'],
          dest: 'Signup_form/assets/css',
          ext: '.css'
        }]
      }
    },
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['Signup_form/assets/js/files/**/*.js'],
        dest: 'Signup_form/assets/js/final/app.js',
      },
    },
    watch: {
      sass: {
        files: ['Signup_form/assets/sass/{,*/}*.{scss,sass}'],
        tasks: ['sass']
      },
      concat:{
        files: ['Signup_form/assets/js/files/{,*/}*.js'],
        tasks: ['concat']
      },
      options: {
        livereload: true,
        spawn: false,
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['sass','concat', 'watch' ]);
}