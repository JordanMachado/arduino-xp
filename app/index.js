import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';
import Sizes from './Sizes';

import FilterView from './views/FilterView';
import Datas from './datas/data.json';


console.log(Datas);

let webgl;
let gui;

// webgl settings
webgl = new Webgl(window.innerWidth/2, window.innerWidth/2 / 1.4);
document.body.appendChild(webgl.renderer.domElement);

// GUI settings
gui = new dat.GUI();
gui.add(webgl.params, 'usePostprocessing');

// handle resize
window.addEventListener('resize', resizeHandler);
window.addEventListener('click', clickHandler);



// let's play !
animate();
/*
 * State 0 ->
 * State 1 -> filter 1
 * State 2 -> filter 2
 * State 3 -> filter 3
 */
 window.onStateUpdate =onStateUpdate;
function onStateUpdate(state) {
  switch (state) {
    case 0:
      state0();
    break;
    case 1:
      state1();
    break;
    case 2:

    break;
    case 3:

    break;
    default:

  }
}


function state0() {
  console.log('state0');
  let size = ( window.innerHeight -(window.innerWidth/2 / 1.4)) / 2;
  let cadres = document.querySelectorAll('.cadre');
  TweenLite.to(cadres,0.5,{
    height:size
  })
}

function state1() {
  let filterview = new FilterView({el:'.filters',datas:Datas.steps[0]});
  filterview.render();
  window.filterview = filterview;

}

function resizeHandler() {
  webgl.resize(window.innerWidth/2, window.innerHeight/2 / 1.4);
}

function clickHandler() {
  webgl.click();
}
function animate() {
  raf(animate);

  webgl.render();
}
