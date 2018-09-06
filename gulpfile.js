var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');

var cssfile=[
	'css/reset.css',
	'css/common.css',
	'css/index.css',
	'css/index-media.css',
	'css/campus.css',
	'css/campus-media.css',
	'css/case.css',
	'css/case-media.css',
	'css/news.css',
	'css/news-media.css',
	'css/recruiting.css',
	'css/recruiting-media.css',
	'css/contact.css',
	'css/contact-media.css',
];
 
var jsfile = [
	'js/index.js',
	'js/campus.js',
	'js/news.js',

];
gulp.task('min-css',function(){
	gulp.src(cssfile).pipe(concat('ltTechnologyDemo.css')).pipe(gulp.dest('css'));
	gulp.src(cssfile).pipe(concat('ltTechnologyDemo.min.css')).pipe(minifycss()).pipe(gulp.dest('css'));
});
gulp.task('min-js',function(){
	gulp.src(jsfile).pipe(concat('ltTechnologyDemo.js')).pipe(gulp.dest('js'));
	gulp.src(jsfile).pipe(concat('ltTechnologyDemo.min.js')).pipe(uglify()).pipe(gulp.dest('js'));
});
gulp.task('default',['min-css','min-js']);