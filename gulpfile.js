'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();




gulp.task('style', function () {
    return gulp.src('source/sass/style.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('source/css'))
        .pipe(server.stream());
  });

gulp.task('serve', gulp.series('style', function() {
    server.init({
        server: "source/"
    });
    gulp.watch('source/sass/**/*.scss', gulp.parallel('style'));
    gulp.watch("source/*.html").on('change', server.reload);
    }));

