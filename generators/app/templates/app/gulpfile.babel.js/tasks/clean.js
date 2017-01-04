import gulp from 'gulp';
import del from 'del';

export default (config) => {
  gulp.task('clean', del.bind(null, config.path));
};
