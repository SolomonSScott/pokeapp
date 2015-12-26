var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var cssGlobbing = require('gulp-css-globbing');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

var paths = {

  scss: {
    src:  './assets/scss/**/*.scss',
    dest: './assets/css',
  }
};

/*
 Browser Sync
 */
gulp.task('browser-sync', function() {
  browserSync({
    // we need to disable clicks and forms for when we test multiple rooms
    server : {},
    middleware : [ historyApiFallback() ],
    ghostMode: false
  });
});


// Compile scss files within assets/scss/
gulp.task('compile-sass', function() {
  return gulp.src(paths.scss.src)
    // https://www.npmjs.com/package/gulp-css-globbing
    .pipe(cssGlobbing({
      extensions: ['.scss']
    }))
    // https://www.npmjs.com/package/gulp-ruby-sass
    .pipe(sass({
      "sourcemap=none": true,
      style: 'expanded',
      precision: 8
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer({
      browsers: ['last 8 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(reload({stream:true}));
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: ['./app/' + file],
    debug : true,
    transform:  [babelify]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./assets/js/build/'))
      // If you also want to uglify it
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('scripts', function() {
  return buildScript('main.js', false); // this will run once because we set watch to false
});

gulp.task('watch', function() {
  gulp.watch(paths.scss.src, ['compile-sass']);
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['compile-sass', 'scripts','browser-sync', 'watch'], function() {
  return buildScript('main.js', true); // browserify watch for JS changes
});