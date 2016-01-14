
uniform vec2 resolution;
uniform sampler2D tInput;
varying vec2 vUv;
uniform float x_pixel;
uniform float y_pixel;
uniform float time;


void main() {

  vec2 normCoord = 2.0 * vUv - 1.0;
  float r = length(normCoord);
  float phi = atan(normCoord.y, normCoord.x);
  r = r - mod(r, x_pixel) + 0.03;
  phi = phi - mod(phi, y_pixel);
  //normCoord.x = r * cos(phi) * cos(time);
  normCoord.x = r * cos(phi);
  normCoord.y = r * sin(phi);
  vec2 textureCoordinateToUse = normCoord / 2.0 + 0.5;
  gl_FragColor = texture2D(tInput, textureCoordinateToUse );
}
