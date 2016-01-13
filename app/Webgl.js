
import THREE from 'three';
var request = require('superagent');
let WAGNER = require('@superguigui/wagner')
let VignettePass = require('@superguigui/wagner/src/passes/vignette/VignettePass');
let InvertPass = require('@superguigui/wagner/src/passes/invert/invertPass');
window.THREE = THREE;
import Video from './objects/Video';
import FilterView from './views/FilterView';

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: true,
    };

    this.width = width;
    this.height = height

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

    this.filterview = new FilterView({el:'.filters',datas:{
      filter:['1','2','3']
    }})
    this.filterview.render();

  //  document.body.appendChild(this.image);
  }
  initPostprocessing() {
    if (!this.params.usePostprocessing) { return; }

    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(window.innerWidth, window.innerHeight);
    window.composer = this.composer;
    // this.vignettePass = new VignettePass();
    this.invertPass = new InvertPass();
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
      this.composer.pass(this.invertPass);


      this.composer.toScreen();

    } else {
      this.renderer.render(this.scene, this.camera);
    }

    this.videoObj.update();
  }
}
