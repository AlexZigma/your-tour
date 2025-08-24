const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// Compile SCSS into CSS & inject
function compileSass() {
  return gulp.src("src/styles/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
}

// Static server + watch files
function serve() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch("src/styles/**/*.scss", compileSass);
  gulp.watch("*.html").on('change', browserSync.reload);
}

// Export tasks
exports.sass = compileSass;
exports.serve = gulp.series(compileSass, serve); // run sass first, then serve
exports.default = exports.serve;