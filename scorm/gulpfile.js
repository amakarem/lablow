var gulp = require('gulp'),
  browserify = require("browserify"),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  concatCss = require('gulp-concat-css'),
  del = require('del'),
  fs = require("fs"),
  minify = require('gulp-minify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');

var reload      = browserSync.reload;

gulp.task('sass', function () {
  return gulp.src('./source/stylesheets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream: true}));
});

gulp.task('vendors:css', function () {
  return gulp.src([
    './bower_components/bootstrap/dist/css/bootstrap.css',
    './bower_components/font-awesome/css/font-awesome.css',
    './bower_components/normalize-css/normalize.css',
    './bower_components/animate.css/animate.css'
  ])
    .pipe(sourcemaps.init())
    .pipe(concatCss("css/vendors.css", {rebaseUrls: false}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('vendors:fonts', function () {
  gulp.src([
    './bower_components/bootstrap/dist/fonts/**/*',
    './bower_components/font-awesome/fonts/**/*'
  ])
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('vendors:scripts', function () {
  gulp.src([
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './bower_components/angular/angular.min.js',
    './node_modules/lodash/lodash.js',
    './node_modules/retina.js/src/retina.js',
    './bower_components/angular-scroll-animate/dist/angular-scroll-animate.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    './bower_components/angular-scroll/angular-scroll.min.js'
  ])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('vendors', ['vendors:css', 'vendors:fonts', 'vendors:scripts']);

gulp.task('scripts', function () {
  gulp.src([
    './source/js/app.js',
    './source/js/controllers/**/*.js',
  ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({stream: true}));
});

gulp.task('browserify', function () {
  browserify([
    './source/js/app.js',
    './source/js/controllers/BaseController.js',
    './source/js/controllers/MultipleChoiceController.js',
    './source/js/controllers/NavbarController.js'
  ])
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(fs.createWriteStream("./dist/js/app.js"));
});


gulp.task('default', ['sass', 'vendors', 'scripts']);

//gulp.task('serve', ['sass', 'vendors', 'browserify'], function() {
gulp.task('serve', ['sass', 'vendors', 'scripts'], function() {

  browserSync({
    server: "./"
  });

  gulp.watch('./source/stylesheets/sass/**/*.scss', ['sass']);
  gulp.watch('./source/js/**/*.js', ['scripts']);
  gulp.watch('./*.html').on('change', reload);
});