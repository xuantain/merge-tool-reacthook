'use strict';

var gulp = require('gulp'), // define task builder
    react = require('gulp-react'), // compile React from JSX
    browserify = require('gulp-browserify'), // require lib/module for client-side
    clean = require('gulp-clean'), // clean old-sourcecode
    pkg = require('./package.json'), // load app info from package.json
    concat = require('gulp-concat'), // join multiple file to vendor.js (one file)
    sourcemaps = require('gulp-sourcemaps'),
    minifyJs = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css')
  ;

var rootDir = 'public';
var srcDir = rootDir + '/src';
var buildDir = rootDir + '/build';
// var buildDir = rootDir + '/build/' + pkg.version;

// clean all old-sourcecode JS
gulp.task('clean', function() {
  return gulp.src( [buildDir + '/**/**/*.js', buildDir + '/css'], {read: false} )
    .pipe( clean() );
});

// compile JSX to JS and save to folder "build/"
gulp.task('jsx', ['clean'], function() {
  return gulp.src( srcDir + '/jsx/**/*.jsx' )
    .pipe( react() )
    .pipe( gulp.dest(buildDir + '/js') );
});

gulp.task('copy', ['jsx','clean'], function(){
  return gulp.src( srcDir + '/jsx/**/*.js' )
    .pipe( gulp.dest(buildDir + '/js') );
});

// browserify to help client-side require/load all lib/module
gulp.task('browserify', ['jsx','copy'], function() {
  return gulp.src( [buildDir + '/js/app.js', buildDir + '/js/admin.js'] )
    .pipe( browserify() )
    .pipe( gulp.dest(buildDir) );
});

// join all file *.js in folder lib
gulp.task('concat-js', ['clean'], function() {
  return gulp.src( srcDir + '/lib/**/*.js' )
    .pipe( sourcemaps.init() )
      .pipe( concat('vendor.js') )
    .pipe( sourcemaps.write('') )
    .pipe( gulp.dest(buildDir + '/lib') );
});

// join all file style *.css
gulp.task('concat-css', ['clean'], function() {
  return gulp.src( srcDir + '/css/**/*.css' )
    .pipe( sourcemaps.init() )
      .pipe( concat('vendor.css', {newLine: ''}) )
    .pipe( sourcemaps.write('') )
    .pipe( gulp.dest(buildDir + '/css') );
});

// minifile *.js
gulp.task('compress-js', function() {
  return gulp.src( buildDir + '/lib/vendor.js' )
    .pipe( minifyJs() )
    .pipe( gulp.dest(buildDir + '/lib/vendor.min.js') );
});

// minifile *.css
gulp.task('compress-css', function() {
  return gulp.src( buildDir + '/css/vendor.css' )
    .pipe( minifyCss() )
    .pipe( gulp.dest(buildDir + '/css/vendor.min.css') );
});

gulp.task('watch', ['build'], function() {
  gulp.watch(srcDir + '/jsx/**/*.jsx', ['build']);
});

gulp.task('minify', ['compress-js', 'compress-css']);
gulp.task('build', ['jsx', 'browserify']);
gulp.task('default', ['build']);
