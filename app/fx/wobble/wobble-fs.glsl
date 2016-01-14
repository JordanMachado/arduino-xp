
uniform vec2 resolution;
uniform sampler2D tInput;
varying vec2 vUv;
uniform float time;

uniform float strength;
uniform float size;
uniform float speed;


void main() {
  vec2 p = -1.0 + 2.0 * vUv;
  gl_FragColor = texture2D(tInput, vUv + strength * vec2(cos(time*speed+length(p*size)), sin(time*speed+length(p*size))));
}
