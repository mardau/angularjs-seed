'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
const debug = require('gulp-debug');
var $ = require('gulp-load-plugins')();

gulp.task('scripts-reload', function ()
{
    return buildScripts()
        .pipe(browserSync.stream());
});

gulp.task('scripts', function ()
{
    return buildScripts();
});

function buildScripts()
{
    return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
        .pipe(debug({ title: 'list js:' }))
        // Enable the following two lines if you want linter
        // to check your code every time the scripts reloaded
        //.pipe($.eslint())
        //.pipe($.eslint.format())
        .pipe($.size())
};