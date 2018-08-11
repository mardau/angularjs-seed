/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
    src : 'src',
    dist: 'dist',
    tmp : '.tmp',
    e2e : 'e2e'
};

exports.errorHandler = function (title)
{
    'use strict';

    return function (err)
    {
        console.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};