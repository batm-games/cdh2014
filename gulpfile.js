// libs
var browserSync = require('browser-sync');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// gulp extras
var gulp = require('gulp');
var compass = require('gulp-compass');
var changed = require('gulp-changed');

gulp.task('browserify', function () {
  var method = global.isWatching ? watchify : browserify;

  var bundler = method({
    entries: ['./src/app.js'],
    extensions: ['js']
  });

  var bundle = function () {
    console.log('build browserify start!');
    return bundler
      .bundle({debug: true})
      .pipe(source('app.js'))
      .pipe(gulp.dest('./public/dist/'))
      .on('end', function () {
        console.log('build browserify complete!');
      });
  };

  if (global.isWatching) {
    bundler.on('update', bundle);
  }

  return bundle();
});

gulp.task('browserSync', ['build'], function () {
  browserSync.init(['./public/dist/**'], {
    server: {
      baseDir: 'public'
    }
  });
});

gulp.task('compass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(compass({
      config_file: 'compass.rb',
      css: 'build',
      sass: 'src/sass'
    }));
});

gulp.task('setWatch', function () {
  global.isWatching = true;
});

gulp.task('watch', ['setWatch', 'browserSync'], function () {
//  gulp.watch('src/**/*', ['browserify']);
  // gulp.watch('src/images/**', ['images']);
  // gulp.watch(['src/assets/**', 'src/index.html'], ['copy']);
});

// main tasks
gulp.task('build', ['browserify', 'compass']);
gulp.task('default', ['watch']);