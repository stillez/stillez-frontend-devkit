var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var coffee = require('gulp-coffee');
var tinylr = require('tiny-lr');
var server = tinylr();

gulp.task('server', function() {
    connect.server({
        port: 9595,
        root: 'dist',
        livereload: true
    });
})

gulp.task('css', function() {
    return sass('src/sass/*.scss', {
        style: 'compressed'
    })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('src/jade/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('src/coffee/**/*.coffee')
        .pipe(coffee({
            bare: true
        }))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    /*Watch .scss*/
    gulp.watch('src/sass/**/*.scss', ['css']);
    /*Watch .jade*/
    gulp.watch('src/jade/**/*.jade', ['html']);
    /*Watch .coffee*/
    gulp.watch('src/coffee/**/*.coffee', ['js']);
    /*Watch .js*/
    gulp.watch('dist/assets/js/**/*.js', ['server']);
});

gulp.task('build', ['html', 'css', 'js']);
gulp.task('dev', ['build', 'server', 'watch']);
gulp.task('default', ['dev']);
