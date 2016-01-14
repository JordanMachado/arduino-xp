
import THREE from 'three';
var request = require('superagent');
let WAGNER = require('@superguigui/wagner')



// pass
let VignettePass = require('@superguigui/wagner/src/passes/vignette/VignettePass');
let InvertPass = require('@superguigui/wagner/src/passes/invert/invertPass');
let SlicePass = require('./fx/slices/slice');
let PixelatePass = require('./fx/pixelate/pixelate');
let PolarPixelatePass = require('./fx/polar-pixelate/polar-pixelate');
let BarrelBlur = require('./fx/barrel-blur/barrel-blur');
let Line = require('./fx/line/line');
let Mirror = require('./fx/mirror/mirror');



window.THREE = THREE;
import Video from './objects/Video';

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: true,
    };

    this.width = width;
    this.height = height;

    this.passes = [];
    this.passes[0] = new Mirror  ({
      time:this.tick
    });
    // this.passes[1] = new InvertPass({
    //   time:this.tick
    // });

    this.canSnap = false;

    this.startTime = Date.now();
    this.tick = 0.0;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x262626);

    this.composer = null;
    this.initPostprocessing();

    this.videoObj = new Video();
    this.videoObj.position.set(0, 0, 0);
    this.scene.add(this.videoObj);

    this.image = document.createElement('img');
    this.image.width = 150;
    this.image.height = 150;



  //  document.body.appendChild(this.image);
  }
  initPostprocessing() {
    if (!this.params.usePostprocessing) { return; }

    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    window.composer = this.composer;

  }

  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
  click() {
    this.snap();
  }
  snap() {
    if(!this.canSnap) return;

    console.log('snap');
    let strMime = "image/png";
    let imgData = this.renderer.domElement.toDataURL(strMime);
    this.image.src = imgData
    request
    .post('http://192.168.2.1:3000')
    .send({ img: imgData})
    .set('Accept', 'application/json')
    .end(function(err, res){
      console.log('end request');
    });
  }
  render() {
    if (this.params.usePostprocessing) {
      this.composer.reset();
      this.composer.render(this.scene, this.camera);


      for (var i = 0; i < this.passes.length; i++) {

          this.composer.pass(  this.passes[i]);
      }


      this.composer.toScreen();

    } else {
      this.renderer.render(this.scene, this.camera);
    }

    this.videoObj.update();
  }
}
