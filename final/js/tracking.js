// 3d model setup

var container;
var webcam, scene, renderer;

var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');

var objects = [];


var PI2 = Math.PI * 2;
function particleRender( context ) {
  context.beginPath();
  context.arc( 0, 0, 0, 0, PI2, true );
  context.fill();
};

var placeTarget = function(x,y,z) {
  var targetObject = new THREE.Object3D();

  // Create sprites with lines

  var color = Math.random() * 0x808008 + 0x808080;

  var sprite = new THREE.Particle( new THREE.ParticleCanvasMaterial( { color: color, program: particleRender } ) );
  sprite.scale.x = z/1000;
  sprite.scale.y = z/1000;
  sprite.position.x = x*z/1000;
  sprite.position.y = y*z/1000;
  sprite.position.z = z;
  targetObject.add( sprite );

  var geometry = new THREE.Geometry();
  geometry.vertices.push( new THREE.Vector3( -sprite.position.x, -sprite.position.y, 0 ) );
  geometry.vertices.push( new THREE.Vector3( 0, 0, z ) );
  var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: color, linewidth : 100 } ) );
  line.position.x = sprite.position.x;
  line.position.y = sprite.position.y;
  targetObject.add( line );

  scene.add(targetObject);

  objects.push(sprite);
  objects.push(line);

  return targetObject;
};

init();
// animate();

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  scene = new THREE.Scene();

  webcam = new THREE.PerspectiveCamera( 23, window.innerWidth / window.innerHeight, 1, 100000 );
  webcam.position.z = 0;
  scene.add( webcam );

}

function showRenderer() {
  renderer = new THREE.CanvasRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );
}

function animate() {
  renderer.render( scene, webcam );
  requestAnimationFrame( animate );
}

function showVideo() {
  videoInput.style.position = 'absolute';
  videoInput.style.top = '0px';
  videoInput.style.zIndex = '100001';
  videoInput.style.display = 'block';
}

Array.prototype.remove = function(object) {
  for (var i = 0;i < this.length;i++) {
    if (this[i] === object) {
      this.splice(i,1);
      break;
    }
  }
};

function randomTarget() {
  var big = 800
  var small = 400

  // Create sprites with lines
  x = (Math.random()*big)-small;
  y = (Math.random()*big)-small;
  z = big*3*(Math.random()+0.2);

  placeTarget(x,y,z);
}

var numLines = 200;
for(var i = 0; i < numLines; i++) {
  randomTarget();
}


// video styling

// set up webcam controller
headtrackr.controllers.three.realisticAbsoluteCameraControl(webcam, 15, [0,0,0], new THREE.Vector3(0,0,0), {damping : 0.5});

// Face detection setup
var htracker = new headtrackr.Tracker({altVideo : {ogv : "./media/capture5.ogv", mp4 : "./media/capture5.mp4"}, cameraOffset : 5});
htracker.init(videoInput, canvasInput);
htracker.start();
