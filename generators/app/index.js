'use strict';
var Generator = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');
var mkdirp = require('mkdirp');
var slugify = require('underscore.string/slugify');
var humanize = require('underscore.string/humanize');

module.exports = Generator.extend({
  prompting: function () {
    this.log(yosay(
      'Let\'s create a new component library!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name (e.g. acme-component-library)?'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author name?'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  },

  writing: function () {
    var props = {
      name: humanize(this.props.name),
      nameHyphenated: slugify(this.props.name),
      author: this.props.author
    };

    this.fs.copyTpl(
      this.templatePath('app/babelrc'),
      this.destinationPath('.babelrc'),
      props
    );

    this.fs.copyTpl(
      this.templatePath('app/editorconfig'),
      this.destinationPath('.editorconfig'),
      props
    );

    this.fs.copyTpl(
      this.templatePath('app/eslintrc.json'),
      this.destinationPath('.eslintrc.json'),
      props
    );

    this.fs.copyTpl(
      this.templatePath('app/gitignore'),
      this.destinationPath('.gitignore'),
      props
    );

    this.fs.copyTpl(
      this.templatePath('app/npmignore'),
      this.destinationPath('.npmignore'),
      props
    );

    this.fs.copyTpl(
      this.templatePath('app/package.json'),
      this.destinationPath('package.json'),
      props
    );

    this.fs.copyTpl(
      this.templatePath('app/README.md'),
      this.destinationPath('README.md'),
      props
    );

    this.fs.copyTpl(
      this.templatePath('app/sass-lint.yml'),
      this.destinationPath('.sass-lint.yml'),
      props
    );

    this.fs.copyTpl(
      this.templatePath('app/gulpfile.babel.js/**/*'),
      this.destinationPath('gulpfile.babel.js/'),
      props
    );

    this.fs.copy(
      this.templatePath('app/src/**/*'),
      this.destinationPath('src/'),
      props
    );
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
});
