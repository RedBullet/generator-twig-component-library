import path from 'path';

const src = 'src';
const dest = 'dist';

const config = {
  src,
  dest,

  clean: {
    path: dest,
  },

  copyAssets: {
    name: 'copyAssets',
    src: [
      `${src}/**/*`,
      `!${src}/components/**/*.js`,
      `!${src}/components/**/*.scss`,
      `!${src}/styles{,/**}`,
      `!${src}/scripts{,/**}`,
      `!${src}/images{,/**}`,
    ],
    dest: `${dest}/assets`,
  },

  copyDocAssets: {
    name: 'copyDocAssets',
    src: ['node_modules/twig-component-library-docs/lib/assets/**/*'],
    dest: 'dist/docassets',
  },

  browserSync: {
    port: 9000,
  },

  docs: {
    src,
    dest,
    name: '<%= name %>',
  },

  lintTasks: [
    'sasslint', 'eslint',
  ],

  sasslint: {
    src: [
      `${src}/styles/**/*.scss`,
    ],
    options: {
      config: path.join(__dirname, '../.sass-lint.yml'),
    },
  },

  scripts: {
    paths: [`${src}/scripts/main.js`],
    dest: `${dest}/assets/scripts`,
  },

  styles: {
    src: [`${src}/styles/*.scss`],
    watch: [
      `${src}/styles/**/*.scss`,
      `${src}/components/**/*.scss`,
    ],
    dest: `${dest}/assets/styles`,
    cssnext: {
      features: { colorRgba: false },
      browsers: '> 1%',
      warnForDuplicates: false,
    },
    sass: {
      includePaths: 'node_modules',
    },
  },
};

export default config;
