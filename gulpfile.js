'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var fs = require('fs');
var mincss = require('mincss');


gulp.task('style', function(){
	gulp.src('source/style/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer()
			]))
		.pipe(gulp.dest('build/style/'))
		.pipe(server.stream());
});

gulp.task('start', ['style'], function() {
	server.init({
		server: "./build",
		notify: false,
		open: true,
		cors: true,
		ui: false
	})

	gulp.watch('source/style/**/*.scss', ['style']);
	gulp.watch('build/*.html').on('change', server.reload);
})
