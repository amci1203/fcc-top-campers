const
    gulp     = require('gulp'),
    watch    = require('gulp-watch'),
    webpack  = require('webpack')
    css      = require('gulp-postcss'),
    pre      = require('precss'),
    math     = require('postcss-calc'),
    prefixer = require('autoprefixer'),
    bs       = require('browser-sync').create(),
    fallback = require('connect-history-api-fallback'),
    log      = require('connect-logger');

const plugins = [pre, math, prefixer];

gulp.task('transpileJs', () => {
    webpack(require('./webpack.config.js'), (err, stats) => {
        console.log(err ? err.toString() : `Script Packing Done...\n${stats.toString()}`);
    })
})

gulp.task('refreshJs', ['transpileJs'], bs.reload)

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
        .pipe(bs.stream());
});

gulp.task('default', ['transpileJs', 'postCSS'], () => {
    bs.init({
        notify: false,
        // workaround for Angular 2 styleUrls loading
        // injectChanges: false,
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

    watch('./app/assets/styles.css', () => gulp.start('injectCSS'))
    watch('./app/assets/app.jsx', () => gulp.start('transpileJs'))
})
