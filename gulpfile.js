
var gulp = require('gulp');
var read = require('fs-readdir-recursive');

read('./gulp').filter(function (file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file);
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
    gulp.start('vendorProd');
});

