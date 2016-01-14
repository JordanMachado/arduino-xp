'use strict';

var THREE = require('three');
var glslify = require('glslify');

let Pass = require('@superguigui/wagner/src/Pass');

var vertex = glslify('@superguigui/wagner/src/shaders/vertex/basic.glsl');
var fragment = glslify('./barrel-blur-fs.glsl');

function PolarPixelate(options) {

  Pass.call(this);
  this.setShader(vertex, fragment);
  this.params.amout = 0.1;

}

module.exports = PolarPixelate;

PolarPixelate.prototype = Object.create(Pass.prototype);

PolarPixelate.prototype.constructor = PolarPixelate;

PolarPixelate.prototype.run = function(composer) {

  this.shader.uniforms.amount.value = this.params.amout;

  composer.pass(this.shader);
};
