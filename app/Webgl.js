
import THREE from 'three';
var request = require('superagent');
let WAGNER = require('@superguigui/wagner')



// pass
let LookUp = require('@superguigui/wagner/src/passes/lookup/lookup');
let InvertPass = require('@superguigui/wagner/src/passes/invert/invertPass');
let SlicePass = require('./fx/slices/slice');
let PixelatePass = require('./fx/pixelate/pixelate');
let PolarPixelatePass = require('./fx/polar-pixelate/polar-pixelate');
let BarrelBlurPass = require('./fx/barrel-blur/barrel-blur');
let LinePass = require('./fx/line/line');
let MirrorPass = require('./fx/mirror/mirror');
let WobblePass = require('./fx/wobble/wobble');



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
    this.passes[1] = new MirrorPass();


    this.passes[0] = new LookUp();
    let texture0 = THREE.ImageUtils.loadTexture('images/lookup.png')
    texture0.minFilter = texture0.magFilter = THREE.LinearFilter;
    this.passes[0].params.uLookup = texture0;



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
    this.image.width = width;
    this.image.height = height;
    this.image.id = 'preview';
    document.body.appendChild(this.image);
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
    // if(!this.canSnap) return;

    console.log('snap');
    let strMime = "image/png";
    this.imgData = this.renderer.domElement.toDataURL(strMime);
    this.image.src = this.imgData
    this.image.style.zIndex = 10;

  }
  sendImg() {
    request
    .post('http://192.168.2.1:3000')
    .send({ img: this.imgData})
    .set('Accept', 'application/json')
    .end(function(err, res){
      console.log('end request');
    });
  }
  retrySnapshot() {
    this.image.style.zIndex = -1;

  }
  updateFilter(number,step) {
    if(step== 1){
      let texture = THREE.ImageUtils.loadTexture('images/lookup'+number+'.png')
      texture.minFilter = texture.magFilter = THREE.LinearFilter;
      this.passes[0].params.uLookup = texture;
    } else {
      let EffectClass = SlicePass;
      switch (number) {
        case 0:
        EffectClass = function(){};
        break;
        case 1:
        EffectClass = BarrelBlurPass

        break;
        case 2:
        EffectClass = LinePass

        break;
        case 3:
        EffectClass = MirrorPass

        break;
        case 4:
        EffectClass = PixelatePass


        break;
        case 5:
        EffectClass = SlicePass

        break;
        case 6:
        EffectClass = PolarPixelatePass


        break;
        case 7:
        EffectClass = WobblePass
        break;

        default:
          EffectClass = SlicePass

      }
      this.passes[1] = new EffectClass();

    }
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
