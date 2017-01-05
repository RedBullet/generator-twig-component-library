'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-twig-component-library:component', function () {
  before(function () {
    var testPath = path.join(__dirname, '.tmp');

    this.prompts = {
      name: 'button',
      type: 'atom',
      description: 'A button component'
    };

    this.componentPath = 'src/components/' + this.prompts.type + 's/' + this.prompts.name;

    return helpers.run(path.join(__dirname, '../generators/component'))
      .inDir(testPath)
      .withPrompts(this.prompts)
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      this.componentPath + '/data/base.json',
      this.componentPath + '/_' + this.prompts.name + '.scss',
      this.componentPath + '/' + this.prompts.name + '.js',
      this.componentPath + '/' + this.prompts.name + '.schema.json',
      this.componentPath + '/' + this.prompts.name + '.twig',
      this.componentPath + '/Readme.md'
    ]);
  });

  it('has stylesheet with correct class name', function () {
    assert.fileContent(this.componentPath + '/_' + this.prompts.name + '.scss', '.' + this.prompts.name);
  });

  it('has schema with correct title', function () {
    assert.fileContent(this.componentPath + '/' + this.prompts.name + '.schema.json', '"title": "' + this.prompts.name + '"');
  });

  it('has template with correct class name', function () {
    assert.fileContent(this.componentPath + '/' + this.prompts.name + '.twig', '<div class="' + this.prompts.name + '">');
  });

  it('has readme containing correct description', function () {
    assert.fileContent(this.componentPath + '/Readme.md', this.prompts.description);
  });
});
