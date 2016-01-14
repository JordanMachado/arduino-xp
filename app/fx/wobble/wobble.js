'use strict';

var THREE = require('three');
var glslify = require('glslify');

let Pass = require('@superguigui/wagner/src/Pass');

var vertex = glslify('@superguigui/wagner/src/shaders/vertex/basic.glsl');
var fragment = glslify('./wobble-fs.glsl');

function Line(options) {

  Pass.call(this);
  this.setShader(vertex, fragment);
  this.params.size =9;
  this.params.speed = 2.9;
  this.params.strength = 0.011;

}

module.exports = Line;

Line.prototype = Object.create(Pass.prototype);

Line.prototype.constructor = Line;

Line.prototype.run = function(composer) {

  this.shader.uniforms.size.value = this.params.size;
  this.shader.uniforms.speed.value = this.params.speed;
  this.shader.uniforms.strength.value = this.params.strength;

  composer.pass(this.shader);
};
