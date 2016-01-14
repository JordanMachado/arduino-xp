'use strict';

var THREE = require('three');
var glslify = require('glslify');

let Pass = require('@superguigui/wagner/src/Pass');

var vertex = glslify('@superguigui/wagner/src/shaders/vertex/basic.glsl');
var fragment = glslify('./mirror-fs.glsl');

function Mirror(options) {

  Pass.call(this);
  this.setShader(vertex, fragment);
  this.params.side =1;

}

module.exports = Mirror;

Mirror.prototype = Object.create(Pass.prototype);

Mirror.prototype.constructor = Mirror;

Mirror.prototype.run = function(composer) {

  this.shader.uniforms.side.value = this.params.side;

  composer.pass(this.shader);
};
