import gulp from 'gulp';
import runSequence from 'run-sequence';
import clean from './tasks/clean';
import copy from './tasks/copy';
import docs from './tasks/docs';
import scripts from './tasks/scripts';
import styles from './tasks/styles';
import browserSync from './tasks/browser-sync';
import config from './config';

clean(config.clean);
copy(config.copyAssets);
copy(config.copyDocAssets);
scripts(config.scripts);
styles(config.styles);
docs(config.docs);
browserSync(config);

gulp.task('build:dev', (callback) => {
  runSequence('clean', [
    'copyAssets',
    'copyDocAssets',
    'scripts:dev',
    'styles:dev',
    'docs',
  ], callback);
});

gulp.task('serve', ['browserSync']);
