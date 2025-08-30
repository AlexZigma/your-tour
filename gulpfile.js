const { src, dest, parallel, series, watch } = require('gulp')
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const del = require('del')
const gulpEsbuild = require('gulp-esbuild')

function browsersync() {
  browserSync.init({
    server: {
      baseDir: './docs/',

    },
    port: 8080,
    ui: { port: 8081 },
    open: true,
  })
}

// Compile SCSS into CSS & inject
function scss() {
  return src("src/scss/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(dest("./docs"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src('./src/main.js')
  .pipe(gulpEsbuild({
    outfile: './main.js',
    bundle: true
  }))
  .pipe(dest('./docs'))
  .pipe(browserSync.stream())
}

function html() {
  return src('./src/index.html')
  .pipe(dest('./docs'))
}

function copyFonts() {
  return src('./src/fonts/**/*', {encoding: false})
  .pipe(dest('./docs/fonts/'))
}

function copyImages() {
  return src('./src/images/**/*', {encoding: false})
  .pipe(dest('./docs/images/'))
}

function copyIcons() {
  return src('./src/icons/**/*', {encoding: false})
  .pipe(dest('./docs/icons/'))
}

async function copyResources() {
  copyFonts()
  copyIcons()
  copyImages()
}

async function clean() {
  return del.sync('./docs/', { force: true })
}

function watch_dev() {
  watch(['./src/main.js'], scripts).on(
    'change',
    browserSync.reload
  )
  watch(['./src/scss/**/*.scss'], scss).on(
    'change',
    browserSync.reload
  )
  watch(['./src/index.html'], html).on(
    'change',
    browserSync.reload
  )
}

exports.default = parallel(
  // clean,
  scss,
  scripts,
  copyResources,
  html,
  browsersync,
  watch_dev
)