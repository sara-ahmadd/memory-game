let gulp = require("gulp"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass")(require("sass")),
  livereload = require("gulp-livereload"),
  notify = require("gulp-notify");

function htmlTask() {
  return gulp
    .src("./src/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./dist"))
    .pipe(livereload());
}

function cssTask() {
  return gulp
    .src("./src/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"))
    .pipe(livereload());
  // .pipe(notify("CSS file is  modified succesfully"));
}

function jsTask() {
  return gulp.src("./src/*.js").pipe(gulp.dest("./dist/js")).pipe(livereload());
}

function imagesTask() {
  return gulp
    .src("./src/images/*.jpg")
    .pipe(gulp.dest("./dist/images"))
    .pipe(livereload());
}
function audioTask() {
  return gulp
    .src("./src/audio/*.mp3")
    .pipe(gulp.dest("./dist/audio"))
    .pipe(livereload());
}

function watchAllTask() {
  require("./server");
  livereload.listen();
  gulp.watch(["./src/*.pug"], htmlTask);
  gulp.watch(["./src/*.scss"], cssTask);
  gulp.watch(["./src/*.js"], jsTask);
  gulp.watch(["./src/**/*.jpg"], imagesTask);
  gulp.watch(["./src/audio/*.mp3"], audioTask);
}

exports.default = gulp.series(
  htmlTask,
  cssTask,
  jsTask,
  imagesTask,
  audioTask,
  watchAllTask
);
