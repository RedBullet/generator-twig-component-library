import gulp from 'gulp';
import changed from 'gulp-changed';

export default (config) => {
  gulp.task(config.name ? config.name : 'copy', () => (
    gulp.src(config.src)
      .pipe(changed(config.dest))
      .pipe(gulp.dest(config.dest))
  ));
};
