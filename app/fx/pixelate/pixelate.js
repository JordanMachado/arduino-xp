'use strict';

var THREE = require('three');
var glslify = require('glslify');

let Pass = require('@superguigui/wagner/src/Pass');

var vertex = glslify('@superguigui/wagner/src/shaders/vertex/basic.glsl');
var fragment = glslify('./pixelate-fs.glsl');

function Pixelate(options) {

  Pass.call(this);
  this.setShader(vertex, fragment);
  this.params.x_pixel = 40.;
  this.params.y_pixel = 40.;

}

module.exports = Pixelate;

Pixelate.prototype = Object.create(Pass.prototype);

Pixelate.prototype.constructor = Pixelate;

Pixelate.prototype.run = function(composer) {

  this.shader.uniforms.x_pixel.value = this.params.x_pixel;
  this.shader.uniforms.y_pixel.value = this.params.y_pixel;

  composer.pass(this.shader);
};
