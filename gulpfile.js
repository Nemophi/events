var gulp = require('gulp'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  changed = require('gulp-changed'),
  sourcemaps = require('gulp-sourcemaps'),
  pump = require('pump'),
  babel = require('gulp-babel');
const { series } = require('gulp');
var config = {
  src: "src",
  dist: "dist"
}

/**
 * 清理目标目录
 */
function cleanJs(cb) {
  pump([
    gulp.src(config.dist),
    clean()
  ], cb)
}

/**
 * 执行JS压缩
 */
// gulp.task('minify:js', [], function (cb) {
//   pump([
//     // 获取原目录下所有的js文件
//     gulp.src(config.src + "/**/*.js"),
//     // 执行更名操作
//     rename({ suffix: '.min' }),
//     // 每次打包时，只打包内容发生改变的文件
//     changed(config.dist, { extension: '.js' }),
//     // 生成sourcemap，需要配合后面的sourcemaps.write()
//     sourcemaps.init(),
//     // 执行JS压缩
//     uglify(),
//     // 生成sourcemap
//     sourcemaps.write(),
//     // 输出至目标目录
//     gulp.dest(config.dist)
//   ], cb);
// });

function minifyJs(cb) {
  pump([
    // 获取原目录下所有的js文件
    gulp.src(config.src + "/**/*.js"),
    babel(),
    // 执行更名操作
    rename({ suffix: '.min' }),
    // 每次打包时，只打包内容发生改变的文件
    changed(config.dist, { extension: '.js' }),
    // 生成sourcemap，需要配合后面的sourcemaps.write()
    sourcemaps.init(),
    // 执行JS压缩
    uglify(),
    // 生成sourcemap
    // sourcemaps.write(),
    // 输出至目标目录
    gulp.dest(config.dist)
  ], cb);
  // return gulp.src(config.src + '/**/*.js')
  //   .pipe(babel())
  //   .pipe(uglify())
  //   .pipe(gulp.dest(config.dist + 'js'))
    // .pipe(connect.reload())
}

/**
 * 监听JS文件变改，即时调用任务执行JS增量打包
 */

function watch(cb) {
  gulp.watch(config.src + "/**/*.js", ['minify:js']);
}

// function run(cb){
//   sequence('clean', 'minifyJs', 'watch', cb);
// }
exports.default = series(cleanJs,minifyJs);
