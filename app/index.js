import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';
import FilterView from './views/FilterView';


let webgl;
let gui;

// webgl settings
webgl = new Webgl(window.innerWidth/2, window.innerHeight/2);
document.body.appendChild(webgl.renderer.domElement);

// GUI settings
gui = new dat.GUI();
gui.add(webgl.params, 'usePostprocessing');

// handle resize
window.addEventListener('resize', resizeHandler);
window.addEventListener('click', clickHandler);






// let's play !
animate();

function resizeHandler() {
  webgl.resize(window.innerWidth/2, window.innerHeight/2);
}

function clickHandler() {
  webgl.click();
}
function animate() {
  raf(animate);

  webgl.render();
}
