const
    gulp     = require('gulp'),
    watch    = require('gulp-watch'),
    webpack  = require('webpack')
    css      = require('gulp-postcss'),
    math     = require('postcss-calc'),
    bs       = require('browser-sync').create(),
    fallback = require('connect-history-api-fallback'),
    log      = require('connect-logger');

const plugins = [imports, mixins, vars, nesting, math, colors];

gulp.task('transpileJs', () => {
    webpack(require('./webpack.config.js'), (err, stats) {
        console.log(err ? err.toString() : 'Script Packing Done...\n');
        console.log(stats);
    }
})

gulp.task('refreshJs', ['transpileJs'], browserSync.reload)

gulp.task('postCSS', () => {
    return gulp.src('./app/assets/styles.css')
        .pipe(css(plugins))
        .on('error', function (err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app'))
})

gulp.task('injectCSS', ['postCSS'], () => {
    return gulp.src('./app/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('default', ['transpileJs', 'postCSS'], () => {
    bs.init({
        notify: false,
        // workaround for Angular 2 styleUrls loading
        injectChanges: false,
        files: ['./**/*.{html,htm,js}'],
        watchOptions: { ignored: 'node_modules' },
        server: {
            baseDir: './app',
            middleware: [
                log({ format: '%date %status %method %url' }),
                fallback({
                    index: '/index.html',
                    // systemjs workaround
                    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
                })
            ]
        }
    })

    watch('./src/css/**/*.css', () => gulp.start('injectCSS'))
    watch('./src/**/*.{js,jsx}', () => gulp.start('transpileJs'))
})
