
uniform vec2 resolution;
uniform sampler2D tInput;
varying vec2 vUv;
uniform float x_pixel;
uniform float y_pixel;


void main() {

vec2 p = vUv;
p.x = floor(p.x * x_pixel)/x_pixel + 0.5/x_pixel;
p.y = floor(p.y * y_pixel)/y_pixel + 0.5/y_pixel;
gl_FragColor = texture2D(tInput, p);


}
