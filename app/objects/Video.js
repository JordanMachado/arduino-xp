import THREE from 'three';

export default class Video extends THREE.Object3D {
  constructor() {
    super();


    this.createVideo();
    this.userMedia();



    this.videoTexture = new THREE.Texture(this.video);
    // this.videoTexture = new THREE.Texture();
    this.videoTexture.minFilter = this.videoTexture.magFilter = THREE.LinearFilter;



    this.geom = new THREE.PlaneGeometry(16, 16*1.4, 1,1);

    this.mat = new THREE.MeshBasicMaterial({
      map : this.videoTexture,
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.add(this.mesh);

  }
  createVideo() {
    this.video = document.createElement('video');
    this.video.width = 512;
    this.video.height = 512;
    this.video.autoplay = true;
    this.video.style.position = 'absolute';
    this.video.style.width = '100px';
    this.video.style.height = '100px';
    this.video.style.bottom = '0px';

    document.body.appendChild(this.video)

  }
  userMedia() {
    console.log('ask user');
    navigator.mozGetUserMedia({video:true}, function(stream){
      this.video.src   = window.URL.createObjectURL(stream);

    }.bind(this), function(error){

    });
  }
  update() {
    if( this.video.readyState === this.video.HAVE_ENOUGH_DATA ){
      this.videoTexture.needsUpdate = true;
    }

    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;
  }
}
