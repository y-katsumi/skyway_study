var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./gulp/tasks', { recurse: true });

gulp.task('watch', function(){
  // gulp.watch('src/**', ['webpack']);
  gulp.watch('src/**', ['riot']);
});

gulp.task('default', ['watch', 'webserver']);
