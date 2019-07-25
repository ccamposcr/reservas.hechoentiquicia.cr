var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    watch        = require('gulp-watch'),
    include      = require('gulp-include'),
    rename       = require('gulp-rename'),
    eslint       = require('gulp-eslint'),
    browserSync  = require('browser-sync').create(),
    runSequence  = require('run-sequence'),
    uglify       = require('gulp-uglify'),
    jsBuildVars  = {
                      'util': {
                        src: './js/util/index.js',
                        dest: './js/',
                        rename: 'util.js'
                      },
                      'components': {
                        src: './js/components/index.js',
                        dest: './js/',
                        rename: 'components.js'
                      },
                      'vendor': {
                        src: './js/vendor/index.js',
                        dest: './js/',
                        rename: 'vendor.js'
                      }
                    };

//reload the browserSync instance
var reloadBrowsers = function(){
  return browserSync.reload();
};

var executeTask = function(args) {
  return runSequence.apply({}, args);
}

//executes the tasks on the args array and calls to reloadBrowsers task at the end
var executeTaskAndReload = function(args){
  args.push('reloadBrowsers');
  return executeTask(args);
}

// Watch
var watch_task = function() {
  //watch for changes on scss js
  watch('./scss/**/**/*.scss', executeTaskAndReload.bind(null, ['sass']));
  watch(['./js/**/**/*.js'], executeTaskAndReload.bind(null, ['js_util','js_vendor','js_components']));
};


var sass_task = function() {
  return gulp
          .src('./scss/style.scss')
                .pipe(plumber())
                .pipe(sass.sync({
                  outputStyle: 'compressed',
                  precision: 10
                }).on('error', sass.logError))
                .pipe(autoprefixer()
                  )
                .pipe(gulp.dest('./css/'));
};

var getJSBuild = function(name){
  return function(){
    return gulp
          .src( jsBuildVars[name].src )
          .pipe( include() )
              .on( 'error', console.log )
          .pipe(uglify())
          .pipe( rename( jsBuildVars[name].rename ) )
          .pipe( gulp.dest( jsBuildVars[name].dest ) );
  };
};

var js_util_build       = getJSBuild('util'),
    js_components_build = getJSBuild('components'),
    js_vendor_build     = getJSBuild('vendor');


var lint = function() {
  var filesToLint = ['./js/**/*.js'];
  
  return gulp
            .src(filesToLint)
            .pipe(eslint())
            .pipe(eslint.format());
            // Break on failure to be super strict
            // .pipe(eslint.failOnError());
};

gulp.task('reloadBrowsers', reloadBrowsers);
gulp.task('sass', sass_task );
gulp.task('js_util', js_util_build );
gulp.task('js_vendor', js_vendor_build );
gulp.task('js_components', js_components_build );
gulp.task('lint', lint );
gulp.task('watch', watch_task);

gulp.task('build', ['js_util', 'js_vendor', 'js_components', 'sass'] );
gulp.task('default', ['build','watch']);