'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var concatCss = require('gulp-concat-css');
var merge = require('merge-stream');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles-reload', ['styles'], function () {
    return buildStyles()
        .pipe(browserSync.stream());
});

gulp.task('bootstrap', function(){
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/bootstrap/dist/css/bootstrap.min.css.map'])
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/css/')));
});

gulp.task('styles', ['bootstrap'], function () {
    return buildStyles();
});


var buildStyles = function () {
    
    var cssStream = gulp.src([path.join(conf.paths.src, '/app/css/*.css')])
        .pipe(concat('main.css'));

    return cssStream.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/css/')));
};