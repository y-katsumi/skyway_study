var gulp = require('gulp');
webserver = require('gulp-webserver');
gulp.task('webserver', function() {
    gulp.src('www') // 公開したい静的ファイルを配置したディレクトリを指定する
    .pipe(webserver({
        host: '192.168.1.119',
        // host: 'localhost',
        port: 3000
        // livereload: true,
        // directoryListing: true,
        // open: true,
    }));
});
