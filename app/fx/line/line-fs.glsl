
uniform vec2 resolution;
uniform sampler2D tInput;
varying vec2 vUv;
uniform float amount;
uniform float lineSize;
uniform float lineTilt;
uniform float lineStrength;
uniform float time;





void main() {

  vec4 col = texture2D(tInput, vUv);
  col += sin(vUv.x*lineSize*(1.0-lineTilt)+vUv.y*lineSize*lineTilt )*lineStrength;
  //col += sin(vUv.x*lineSize*(1.0-lineTilt)+vUv.y*lineSize*lineTilt * cos(time))*lineStrength;
  gl_FragColor = col;
}
