'use strict';

var THREE = require('three');
var glslify = require('glslify');

let Pass = require('@superguigui/wagner/src/Pass');

var vertex = glslify('@superguigui/wagner/src/shaders/vertex/basic.glsl');
var fragment = glslify('./slice-fs.glsl');

function Lookup(options) {

  Pass.call(this);
  this.setShader(vertex, fragment);

}

module.exports = Lookup;

Lookup.prototype = Object.create(Pass.prototype);

Lookup.prototype.constructor = Lookup;

Lookup.prototype.run = function(composer) {



  composer.pass(this.shader);
};
