import gulp from 'gulp';
import docs from 'twig-component-library-docs';

export default (config) => {
  gulp.task('docs', [], () => docs(config));
};
