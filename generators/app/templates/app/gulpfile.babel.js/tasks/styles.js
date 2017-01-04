import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import gulpUtil from 'gulp-util';
import gulpIf from 'gulp-if';

function handleError(err) {
  gulpUtil.log(err);
  this.emit('end');
}

function stylesheets(config, dev) {
  const processors = [cssnext(config.cssnext)];

  if (!dev) {
    processors.push(cssnano());
  }

  return gulp.src(config.src)
    .pipe(sassGlob())
    .pipe(gulpIf(dev, sourcemaps.init()))
    .pipe(sass(config.sass))
    .on('error', handleError)
    .pipe(postcss(processors))
    .pipe(gulpIf(dev, sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest));
}

export default (config) => {
  gulp.task('styles:dev', stylesheets.bind(null, config, true));
  gulp.task('styles:prod', stylesheets.bind(null, config, false));
};
