import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpUtil from 'gulp-util';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import eventStream from 'event-stream';
import envify from 'loose-envify/custom';
import flatten from 'gulp-flatten';

export function applyEnv(bundle, dev = false) {
  return bundle.transform(envify(
    { NODE_ENV: (dev ? 'development' : 'production') }
  ), { global: true });
}

export function scriptsStream(config, bundlerArr, dev = false, shouldThrow = true) {
  const tasks = bundlerArr.map(bundler => bundler.bundle
      .bundle()
      .on('error', (error) => {
        gulpUtil.log('Browserify Error', error);
        if (shouldThrow) {
          throw error;
        }
      })
      .pipe(source(bundler.script))
      .pipe(buffer())
      .pipe(gulpIf(dev, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpIf(!dev, uglify()))
      .pipe(gulpIf(dev, sourcemaps.write('.')))
      .pipe(flatten())
      .pipe(gulp.dest(config.dest))
  );
  return eventStream.merge.apply(null, tasks);
}

export function bundleScripts(config, bundlerArr, dev = false, shouldThrow = true) {
  const updatedBundlerArr = bundlerArr.map(bundler => (
    { ...bundler, bundle: applyEnv(bundler.bundle, dev) }
  ));
  return scriptsStream(config, updatedBundlerArr, dev, shouldThrow);
}

export function createBundlers(config) {
  const scripts = config.paths;

  return scripts.map(script => (
    {
      bundle: browserify(script, { debug: true }).transform(babelify),
      script,
    }
  ));
}

export default (config) => {
  const bundlers = createBundlers(config);

  gulp.task('scripts:dev', bundleScripts.bind(null, config, bundlers, true));
  gulp.task('scripts:prod', bundleScripts.bind(null, config, bundlers, false));
};
