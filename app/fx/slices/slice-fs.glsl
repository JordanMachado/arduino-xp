#define LUT_FLIP_Y

uniform vec2 resolution;
uniform sampler2D tInput;
varying vec2 vUv;
uniform float tick;
uniform float slices;
uniform float time;

float rand(vec2 co){
return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {


  vec2 p = vUv;
  float yInt = floor(vUv.y * slices)/slices;
  float rnd = rand(vec2(yInt,yInt));
  p.x += sin(8.*time*rnd/5.0) * 0.056 - 0.056/2.0;
  p.x += sin(8.*time*rnd/5.0) * 0.056 - 0.056/2.0;
  p.x = fract(p.x);
  gl_FragColor = texture2D(tInput, p);


}
