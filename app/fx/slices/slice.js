'use strict';

var THREE = require('three');
var glslify = require('glslify');

let Pass = require('@superguigui/wagner/src/Pass');

var vertex = glslify('@superguigui/wagner/src/shaders/vertex/basic.glsl');
var fragment = glslify('./slice-fs.glsl');

function Slice(options) {

  Pass.call(this);
  this.setShader(vertex, fragment);
  this.params.tick = 0.;
  this.params.slices = 40.;

}

module.exports = Slice;

Slice.prototype = Object.create(Pass.prototype);

Slice.prototype.constructor = Slice;

Slice.prototype.run = function(composer) {

  this.shader.uniforms.tick.value = this.params.tick;
  this.shader.uniforms.slices.value = this.params.slices;

  composer.pass(this.shader);
};
