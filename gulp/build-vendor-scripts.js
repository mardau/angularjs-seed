'use strict'

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var concat = require('gulp-concat');
var bowerMain = require('bower-main');
var bowerMainJavaScriptFiles = bowerMain('js', 'min.js');
var minified = bowerMainJavaScriptFiles.minified.filter(function (filename) {
    if (filename.indexOf('angular-mocks') === -1 && 
        filename.indexOf('angular-loader') === -1) return filename;
  });
const debug = require('gulp-debug');

gulp.task('vendorDev', function () {
    return gulp.src(bowerMainJavaScriptFiles.normal)
        .pipe(debug({ title: 'list bower:' }))
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/js')))
});

gulp.task('vendorProd', function () {
    return gulp.src(minified)
        .pipe(debug({ title: 'list bower:' }))
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./dist/js'))
});