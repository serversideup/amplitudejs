var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function() {
  return gulp.src('js/amplitude.js')
    .pipe(rename('amplitude.min.js'))
    .pipe(uglify())	
    .pipe(gulp.dest('js'));
});

