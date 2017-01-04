import gulp from 'gulp';
import browserSync from 'browser-sync';
import watchify from 'watchify';
import gulpUtil from 'gulp-util';
import { createBundlers, scriptsStream, applyEnv } from './scripts';

export default (config) => {
  gulp.task('browserSync', ['build:dev'], () => {
    browserSync({
      server: config.dest,
    });

    gulp.watch(`${config.dest}/**/*`).on('change', browserSync.reload);
    gulp.watch(config.styles.watch, ['styles:dev']);
    gulp.watch(config.copy, ['copyAssets']);
    gulp.watch(`${config.src}/components/**/*.{twig,md,json}`, ['docs']);

    const bundlers = createBundlers(config.scripts);

    bundlers.forEach(bundler => {
      const watchifyBundle = watchify(applyEnv(bundler.bundle, true));
      watchifyBundle.on('log', gulpUtil.log);
      const bundlerArr = [{ bundle: watchifyBundle, script: bundler.script }];
      scriptsStream(config.scripts, bundlerArr, true);
      watchifyBundle.on('update',
        scriptsStream.bind(null, config.scripts, bundlerArr, true, false)
      );
    });
  });
};
