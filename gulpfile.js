var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    jade         = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    watch        = require('gulp-watch'),
    include      = require('gulp-include'),
    rename       = require('gulp-rename'),
    eslint       = require('gulp-eslint'),
    browserSync  = require('browser-sync').create(),
    debug        = require('gulp-debug'),
    runSequence  = require('run-sequence'),
    uglify       = require('gulp-uglify'),
    jsBuildVars  = {
                      'util': {
                        src: './src/clientlibs/js/util/index.js',
                        dest: './dist/clientlibs/js/',
                        rename: 'util.js'
                      },
                      'components': {
                        src: './src/clientlibs/js/components/index.js',
                        dest: './dist/clientlibs/js/',
                        rename: 'components.js'
                      },
                      'vendor': {
                        src: './src/clientlibs/js/vendor/index.js',
                        dest: './dist/clientlibs/js/',
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

// Static server
var server = function() {
  browserSync.init({
    server: './dist'
  });

  //watch for changes on jade, scss js and images
  watch('./src/**/**/*.jade', executeTaskAndReload.bind(null, ['html']));
  watch('./src/clientlibs/scss/**/**/*.scss', executeTaskAndReload.bind(null, ['sass']));
  watch(['./src/clientlibs/js/**/**/*.js'], executeTaskAndReload.bind(null, ['js_util','js_vendor','js_components']));
};

var html_build = function () {

  var pretty = true;
  var jadeVars = {};

  return gulp
          .src( './src/*.jade' )
          .pipe( debug({title: 'jade'}))
          .pipe( jade( {"pretty":pretty, "locals": jadeVars } ) )
          .pipe( gulp.dest( "./dist" ) );
};

var sass_task = function() {
  return gulp
          .src('./scss/style.scss')
                .pipe(plumber())
                .pipe(sass.sync({
                  outputStyle: 'compressed',
                  precision: 10
                }).on('error', sass.logError))
                .pipe(autoprefixer({
                      browsers: ['last 2 versions', 'last 4 iOS versions', 'ie >= 10'],
                      cascade: false
                    })
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
  var filesToLint = ['./src/clientlibs/js/**/*.js'];
  
  return gulp
            .src(filesToLint)
            .pipe(eslint())
            .pipe(eslint.format());
            // Break on failure to be super strict
            // .pipe(eslint.failOnError());
};


gulp.task('sass', sass_task );
gulp.task('js_util', js_util_build );
gulp.task('js_vendor', js_vendor_build );
gulp.task('js_components', js_components_build );
gulp.task('lint', lint );
gulp.task('server', server);
gulp.task('reloadBrowsers', reloadBrowsers);
gulp.task('html', html_build);

gulp.task('build', [/*'js_util', 'js_vendor', 'js_components',*/ 'sass'/*, 'html'*/] );
gulp.task('default', ['build','server']);