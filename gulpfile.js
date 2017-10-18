var gulp = require('gulp');
var sass = require('gulp-sass');
var src = {
  scss: 'app/scss/*.scss',
  css: 'app/css',
  html: 'app/*.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {


  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('styles', function() {
  return gulp.src(src.scss)
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(gulp.dest(src.css));
});

gulp.task('default', ['serve']);
