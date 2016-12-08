const gulp = require('gulp'),
      watch = require('gulp-watch'),
      webpack = require('webpack');
const css = require('gulp-postcss'),
      colors = require('postcss-color-function'),
      imports = require('postcss-import'),
      nesting = require('postcss-nested'),
      math = require('postcss-calc'),
      vars = require('postcss-simple-vars');
const browserSync = require('browser-sync').create(),
      fallback = require('connect-history-api-fallback'),
      log = require('connect-logger');

gulp.task('transpileJs', () => {
  webpack(require('./webpack.config.js'), function (err, stats) {
  if (err) {
    console.log(err.toString());
  }
    console.log('Script Packing Done...\n');
  })
})

gulp.task('refreshJs', ['transpileJs'], () => browserSync.reload())

gulp.task('postCss', () => {
  return gulp.src('./src/css/styles.css')
  .pipe(css([imports, vars, nesting, math, colors]))
  .on('error', function (err) {
    console.error(err.toString());
    this.emit('end');
  })
  .pipe(gulp.dest('./app'))
})

gulp.task('default', ['transpileJs', 'postCss'], () => {
  browserSync.init({
    injectChanges: false, // workaround for Angular 2 styleUrls loading
    files: ['./**/*.{html,htm,css,js}'],
    watchOptions: {
      ignored: 'node_modules'
    },
    server: {
      baseDir: './app',
      middleware: [
        log({ format: '%date %status %method %url' }),
        fallback({
          index: '/index.html',
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
        })
      ]
    }
  })

  watch('./src/css/**/*.css', () => gulp.start('postCss'))
  watch('./src/**/*.{js,jsx}', () => gulp.start('transpileJs'))
})
