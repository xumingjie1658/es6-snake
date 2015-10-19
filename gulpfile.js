/**
 * Created by xumingjie on 15/10/19.
 */

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var md5 = require('MD5');
var gutil = require('gulp-util');
var fs = require('fs');
var rimraf = require('gulp-rimraf');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var rename = require('gulp-rename');

var config = {
    module : 'es6-snake',
    dest : './dst/',
    view : 'index.html',
    viewPath : './',
    jsPath : './js/'
};

var tasks = {
    cleanJs : config.module + '.clean.js',
    moduleJs : config.module + '.module.js.',
    layoutJs : config.module + '.layout.js',
    module : config.module
}

gulp.task('default', function() {
    // place code for your default task here

});

gulp.task(tasks.cleanJs, function () {
    return gulp.src(config.dest + '*.js', {read: false})
        .pipe(rimraf({force: true}));
});


gulp.task(tasks.moduleJs,[tasks.cleanJs], function() {
    return browserify({
        entries: [config.jsPath + 'main.js'], // Only need initial file, browserify finds the deps
        transform: [babelify,reactify] // We want to convert JSX to normal javascript
    })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.dest));
});

gulp.task(tasks.layoutJs, [tasks.moduleJs], function () {
    var sourceJs = config.dest + "main.js";
    var hashJs = md5(fs.readFileSync(sourceJs, "utf8"));
    var finalJs = config.dest + config.module + hashJs + '.js';
    fs.renameSync(sourceJs, finalJs);

    return gulp.src(config.view)
        .pipe(inject(gulp.src(finalJs, {read: false}),
            {
                starttag: '<!-- inject:js -->',
                transform: function (filepath, i, length) {
                    var source = null;
                    var fileName = require('path').basename(filepath);
                    source = config.dest + fileName;
                    return "<script src='" + source + "' type='text/javascript'></script>";
                }
            }))
        .pipe(gulp.dest(config.viewPath));
});

gulp.task(tasks.module, function () {
    var runSequence = require('run-sequence');
    runSequence(tasks.layoutJs);
});