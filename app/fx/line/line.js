'use strict';

var THREE = require('three');
var glslify = require('glslify');

let Pass = require('@superguigui/wagner/src/Pass');

var vertex = glslify('@superguigui/wagner/src/shaders/vertex/basic.glsl');
var fragment = glslify('./line-fs.glsl');

function Line(options) {

  Pass.call(this);
  this.setShader(vertex, fragment);
  this.params.lineSize =250;
  this.params.lineTilt = 0.9;
  this.params.lineStrength = 0.3;

}

module.exports = Line;

Line.prototype = Object.create(Pass.prototype);

Line.prototype.constructor = Line;

Line.prototype.run = function(composer) {

  this.shader.uniforms.lineSize.value = this.params.lineSize;
  this.shader.uniforms.lineTilt.value = this.params.lineTilt;
  this.shader.uniforms.lineStrength.value = this.params.lineStrength;

  composer.pass(this.shader);
};
