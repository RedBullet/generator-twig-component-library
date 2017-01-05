'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-twig-component-library:app', function () {
  before(function () {
    var testPath = path.join(__dirname, '.tmp');

    this.prompts = {
      name: 'acme-component-library',
      author: 'Red Bullet'
    };

    return helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(testPath)
      .withPrompts(this.prompts)
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'gulpfile.babel.js/tasks/browser-sync.js',
      'gulpfile.babel.js/tasks/clean.js',
      'gulpfile.babel.js/tasks/copy.js',
      'gulpfile.babel.js/tasks/docs.js',
      'gulpfile.babel.js/tasks/scripts.js',
      'gulpfile.babel.js/tasks/styles.js',
      'gulpfile.babel.js/config.js',
      'gulpfile.babel.js/index.js',
      'src/components/atoms/Readme.md',
      'src/components/molecules/Readme.md',
      'src/components/organisms/Readme.md',
      'src/components/templates/Readme.md',
      'src/components/utils/component.twig',
      'src/scripts/main.js',
      'src/styles/base/_base.scss',
      'src/styles/base/_forms.scss',
      'src/styles/base/_layout.scss',
      'src/styles/base/_lists.scss',
      'src/styles/base/_media.scss',
      'src/styles/base/_tables.scss',
      'src/styles/base/_typography.scss',
      'src/styles/base/_variables.scss',
      'src/styles/main.scss',
      '.babelrc',
      '.editorconfig',
      '.eslintrc.json',
      '.gitignore',
      '.npmignore',
      '.sass-lint.yml',
      'package.json',
      'README.md'
    ]);
  });

  it('has package.json with correct name and author', function () {
    assert.fileContent('package.json', '"name": "' + this.prompts.name + '"');
    assert.fileContent('package.json', '"author": "' + this.prompts.author + '"');
  });

  it('has build config file with correct docs name', function () {
    assert.fileContent('package.json', '"name": "' + this.prompts.name + '"');
    assert.fileContent('package.json', '"author": "' + this.prompts.author + '"');
  });
});
