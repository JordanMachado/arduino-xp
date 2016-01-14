'use strict';

var THREE = require('three');
var glslify = require('glslify');

let Pass = require('@superguigui/wagner/src/Pass');

var vertex = glslify('@superguigui/wagner/src/shaders/vertex/basic.glsl');
var fragment = glslify('./polar-pixelate-fs.glsl');

function PolarPixelate(options) {

  Pass.call(this);
  this.setShader(vertex, fragment);
  this.params.x_pixel = 0.04;
  this.params.y_pixel = 0.1;

}

module.exports = PolarPixelate;

PolarPixelate.prototype = Object.create(Pass.prototype);

PolarPixelate.prototype.constructor = PolarPixelate;

PolarPixelate.prototype.run = function(composer) {

  this.shader.uniforms.x_pixel.value = this.params.x_pixel;
  this.shader.uniforms.y_pixel.value = this.params.y_pixel;

  composer.pass(this.shader);
};
