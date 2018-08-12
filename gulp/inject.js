'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
const debug = require('gulp-debug');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function ()
{
    browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function ()
{
    //.pipe(inject(gulp.src('./src/importantFile.js', {read: false}), {name: 'bootstrap'}))
    var injectStyles = gulp.src([
        path.join(conf.paths.tmp, '/serve/app/css/**/*.css'),
        path.join('!' + conf.paths.tmp, '/serve/app/css/bootstrap.min.css'),
        path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'),
    ], {read: false});

    var injectBoostrap = gulp.src([
        path.join(conf.paths.tmp, '/serve/app/css/bootstrap.min.css')
    ], {read: false}).pipe(debug());

    
    var injectScripts = gulp.src([
            path.join(conf.paths.src, '/app/**/*.module.js'),
            path.join(conf.paths.src, '/app/**/*.js'),
            path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
            path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
        ])
        .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

    var injectOptions = {
        ignorePath  : [conf.paths.src, path.join(conf.paths.tmp, '/serve'), path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    var injectBootstrapOptions = {
        name: 'bootstrap',
        ignorePath  : [conf.paths.src, path.join(conf.paths.tmp, '/serve'), path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    return gulp.src(path.join(conf.paths.src, '/*.html'))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe($.inject(injectBoostrap, injectBootstrapOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});