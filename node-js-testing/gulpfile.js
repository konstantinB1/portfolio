var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('serve', function() {
    var server = gls.static('static');
    server.start();

    gulp.watch(['static/css/*.css', 'static/**/*.html', 'static/**/*.js'], function (file) {
        server.notify.apply(server, [file]);
    });
});