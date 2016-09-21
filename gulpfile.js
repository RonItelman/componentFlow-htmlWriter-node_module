var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

gulp.task('default', function(callback) {
  runSequence(['browserSync', 'watch'], callback);
});


gulp.task('watch', ['browserSync'], function() {
  gulp.watch('./public/stylesheets/*.css', browserSync.reload);
  gulp.watch('./sass/**/*.scss', ['sass'], browserSync.reload);
  gulp.watch('./public/javascripts/**/*.js', browserSync.reload);
  gulp.watch('./views/**/*.jade', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
      notify: false,
      proxy: "localhost:3000",
      reloadDelay: 500,
    });
});
