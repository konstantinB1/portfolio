'use strict';

var gulp = require('gulp');
var gls = require('gulp-live-server');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var stripCssComments = require('gulp-strip-css-comments');

var css = './playground/css/';

gulp.task('serve', function() {
    var server = gls.static('playground');
    server.start();

    gulp.watch(['playground/index.html', 'playground/css/*.css',
                'playground/js/*.js', 'playground/sass/**/*.sass', 
                'playground/sass/*.sass',], function (file) {
        server.notify.apply(server, [file]);
    });

});

gulp.task('strip', function () {
    return gulp.src('playground/css/index.css', { base: './' })
        .pipe(stripCssComments({ preserve: false }))
        .pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
	return gulp.src('playground/sass/*.scss')          
           .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
           .pipe(sass({
            includePaths: ['./node_modules/compass-mixins/lib']
           })
           .on('error', sass.logError))           
	       .pipe(gulp.dest(css));
});

gulp.task('sass:watch', function() {
	gulp.watch(['./playground/sass/*.scss', './playground/sass/**/*.scss'], ['sass']);
})
