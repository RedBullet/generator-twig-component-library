'use strict';
var Generator = require('yeoman-generator');
var yosay = require('yosay');

const paths = {
  components: 'src/components'
};

module.exports = Generator.extend({
  prompting: function () {
    this.log(yosay(
      'Let\'s build a new component!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What should we call this component?',
        default: 'my-component'
      },
      {
        type: 'list',
        name: 'type',
        message: 'What type of component is it?',
        choices: [
          {name: 'atom', value: 'atoms'},
          {name: 'molecule', value: 'molecules'},
          {name: 'organism', value: 'organisms'},
          {name: 'template', value: 'templates'}
        ],
        default: 'atoms'
      },
      {
        type: 'input',
        name: 'description',
        message: 'What does it do?'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.config.save();
    }.bind(this));
  },

  writing: function () {
    var path = paths.components + '/' + this.props.type + 's/' + this.props.name;
    var props = {
      componentName: this.props.name,
      description: this.props.description,
      type: this.props.type
    };

    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(path + '/' + this.props.name + '.js'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('component.schema.json'),
      this.destinationPath(path + '/' + this.props.name + '.schema.json'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('_component.scss'),
      this.destinationPath(path + '/_' + this.props.name + '.scss'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('component.twig'),
      this.destinationPath(path + '/' + this.props.name + '.twig'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('Readme.md'),
      this.destinationPath(path + '/Readme.md'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('data/base.json'),
      this.destinationPath(path + '/data/base.json'),
      props
    );
  }
});
