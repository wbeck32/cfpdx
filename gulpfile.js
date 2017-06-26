var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload');
  // postcss      = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    watch = require("gulp-watch-sass");
  // autoprefixer = require('autoprefixer');


gulp.task('default', function() {
  gulp.start('start');
});

//TODO: autoprefixer isn't working correctly
gulp.task('sass', function () {
  return gulp.src('build/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    // .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(sourcemaps.write())
    // .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(livereload());
});

gulp.task('buildJs', function(){
  return gulp.src('build/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'))
    .pipe(livereload());
});


gulp.task('start',function(){
  livereload.listen();
  gulp.watch('build/js/*.js', ['buildJs']);
  gulp.watch('build/scss/*.scss', ['sass']);
});
