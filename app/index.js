import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

import FilterView from './views/FilterView';
import Datas from './datas/data.json';


console.log(Datas);

let webgl;
let poster;
let filterView;
let gui;


// webgl settings
webgl = new Webgl(window.innerWidth/2, window.innerWidth/3.4);
document.body.appendChild(webgl.renderer.domElement);

// poster
poster = document.querySelector('.poster');
poster.style.width = window.innerWidth/2 + 'px'
poster.style.height = window.innerWidth/3.4 + 'px'

// filter view
filterView = new FilterView({el:'.filters',datas:Datas.steps[0]});
window.filterView = filterView;

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
 window.onStateUpdate = onStateUpdate;
function onStateUpdate(state) {
  switch (state) {
    case 0:
      state0();
    break;
    case 1:
      state1();
    break;
    case 2:
      state2();

    break;
    case 3:

    break;
    default:

  }
}


function state0() {
  console.log('state0');

  let size = ( window.innerHeight -(window.innerWidth/3.4)) / 2;
  let cadres = document.querySelectorAll('.cadre');
  TweenLite.to(poster,0.5,{
    autoAlpha:0
  })
  // TweenLite.to(cadres,0.5,{
  //   height:size
  // })
}

function state1() {
  filterView.render();
}

function state2() {
  filterView.update(Datas.steps[1]);
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
