#define LUT_FLIP_Y

uniform vec2 resolution;
uniform sampler2D tInput;
varying vec2 vUv;

float rand(vec2 co){
return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {


  vec2 p = vUv;
  float yInt = floor(vUv.y * 40.)/40.;
  float rnd = rand(vec2(yInt,yInt));
  p.x += sin(10.*rnd/5.0) * 0.056 - 0.056/2.0;
  p.x = fract(p.x);
  gl_FragColor = texture2D(tInput, p);


}
