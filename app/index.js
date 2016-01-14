import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import domready from 'domready';
import 'gsap';

import FilterView from './views/FilterView';
import Datas from './datas/data.json';


let webgl;
let poster;
let text;
let filterView;
let gui;
let step = -1;


// webgl settings
webgl = new Webgl(window.innerWidth/2, window.innerWidth/3.4);
window.webgl = webgl;
// webgl = new Webgl(window.innerWidth, window.innerWidth);
document.body.appendChild(webgl.renderer.domElement);

// poster
poster = document.querySelector('.poster');

poster.style.width = window.innerWidth/2 + 'px'
poster.style.height = window.innerWidth/3.4 + 'px'


text = document.querySelector('.text');
text.style.width = window.innerWidth/2 + 'px'

let advice = document.querySelector('.advice');
advice.style.width = window.innerWidth/2 + 'px'
let height = ( window.innerHeight -(window.innerWidth/2 / 1.4)) / 2;
advice.style.height = height+'px';



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
  console.log('onStateUpdates');
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
      state3();
    break;
    case 4:
      state4();

    break;
    default:

  }
}


function state0() {
  console.log('state0');

  let size = ( window.innerHeight -(window.innerWidth/3.4)) / 2;
  TweenLite.to(poster,0.5,{
    autoAlpha:0,
    ease:Quad.easeOut
  })
  TweenLite.to(advice,0.5,{
    autoAlpha:1,
    ease:Quad.easeOut
  })
  TweenLite.to(document.querySelector('.step1'),0.5,{
    autoAlpha:1,
    ease:Quad.easeOut
  })

}

function state1() {
  console.log('state1');
  TweenLite.to(document.querySelector('.step1'),0.5,{
    autoAlpha:0
  })
  if(filterView.isRendered) {
    filterView.update(Datas.steps[0]);
    filterView.on('hiden',()=>{
      filterView.render()
    })
  } else {
    filterView.render()
  }


}

function state2() {
  console.log('state2');
  TweenLite.to(document.querySelector('.step1'),0.5,{
    autoAlpha:0,
    ease:Quad.easeOut
  })
  filterView.update(Datas.steps[1]);
  filterView.on('hiden',()=>{
    filterView.render()
  })
}
function state3() {
  console.log('state3');
  filterView.off('hiden');
  filterView.hide();
  filterView.on('hiden',()=>{
    TweenLite.to(document.querySelector('.step3'),0.5,{
      autoAlpha:1,
      ease:Quad.easeOut
    })
  })
  webgl.canSnap = true;

}

function state4() {
  console.log();
  TweenLite.to(document.querySelector('.step3'),0.5,{
    autoAlpha:0,
    ease:Quad.easeOut
  })
  TweenLite.to(document.querySelector('.step4'),0.5,{
    autoAlpha:1,
    ease:Quad.easeOut
  })

}

function updateFilter(number,step) {
  webgl.updateFilter(number,step)
}
function sendImg(number,step) {
  webgl.sendImg();
}
function retrySnapshot() {
  webgl.retrySnapshot();
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
