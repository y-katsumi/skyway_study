var gulp    = require('gulp');
var config  = require('../config');
var riot = require('gulp-riot');
var plumber = require('gulp-plumber');

gulp.task('riot', function(){
  return gulp.src(config.src + '/riot_tag/**')
    .pipe(plumber())
    .pipe(riot())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(gulp.dest(config.dest + '/riot_tag'))
});
