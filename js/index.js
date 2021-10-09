//import * as THREE from '../node_modules/three/build/three.module.js';
import * as THREE from "https://threejs.org/build/three.module.js"

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(
	-80,
	80,
	45,
	-45,
	1,
	1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(
	window.innerWidth, 
	window.innerHeight);

document.body.appendChild(
	renderer.domElement);

camera.position.z = 5;



const textureLoader = new THREE.TextureLoader();
let oceantex = new Array();
let headtex = new Array();
let oceanmat = new Array();
let headmat = new Array();
for(let i = 0; i<=6;i++){
	oceantex[i] = textureLoader.load('files/ocean'+(i+1)+'.png');

	//two lines for no interpolation when zooming onto texture 
	oceantex[i].magFilter = THREE.NearestFilter;
	oceantex[i].minFilter = THREE.NearestFilter;
}

const handtex = textureLoader.load('files/hand.png');
handtex.magFilter = THREE.NearestFilter;
handtex.minFilter = THREE.NearestFilter;

const bodytex = textureLoader.load('files/body.png');
bodytex.magFilter = THREE.NearestFilter;
bodytex.minFilter = THREE.NearestFilter;


for(let i = 0; i<=2;i++){
	headtex[i] = textureLoader.load('files/head'+(i+1)+'.png');
	headtex[i].magFilter = THREE.NearestFilter;
	headtex[i].minFilter = THREE.NearestFilter;
}


for(let i = 0; i<=6; i++){
	oceanmat[i] = new THREE.SpriteMaterial({map: oceantex[i]});
}
for(let i = 7; i<=11; i++){
	oceanmat[i] = oceanmat[12-i];
}
// 0 1 2 3 4 5 6 7 8 9 10 11 index
// 1 2 3 4 5 6 7 6 5 4 3 2 frame


for(let i = 0; i<=2; i++){
	headmat[i] = new THREE.SpriteMaterial({map: headtex[i]});
}
headmat[3] = headmat[1];
// 0 1 2 3
// 1 2 3 2
let bodymat = new THREE.SpriteMaterial({map: bodytex});

let handmat = new THREE.SpriteMaterial({map: handtex});
/*
camera z = 5
head 3
body 2
hand 1
ocean z = 0
*/
const ocean = new THREE.Sprite(oceanmat[0]);
const hand = new THREE.Sprite(handmat);
const head = new THREE.Sprite(headmat[0]);
const body = new THREE.Sprite(bodymat);
ocean.scale.set(160,90,1);
head.scale.set(160,90,1);
body.scale.set(160,90,1);
hand.scale.set(160,90,1);
hand.position.z = 1;
body.position.z = 2;
head.position.z = 3;
scene.add(ocean);
scene.add(hand);
scene.add(head);
scene.add(body);



let oceanC = 0;
let headC = 0;

let then1 = Date.now();
let then2 = then1;
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function oceanAnimate(){ // 6 fps = 1 frame per 1/6 seconds = 1 frame per 1000/6 seconds
	requestAnimationFrame(oceanAnimate);
	let now = Date.now();

	let elapsedMilliseconds = now - then1;
	let frameInterval = 1000/6;
	if(elapsedMilliseconds > frameInterval){
		then1 = now - (elapsedMilliseconds%frameInterval);
		// then(point0) ...... point1 .....now ....point2,
		//[point1 - then] is frameinterval, 
		// [now - then] is elapsedMilliseconds
		//move then to point1
		oceanC = (oceanC+1)%12;
		ocean.material = oceanmat[oceanC];
	}

}
function headAnimate(){
	requestAnimationFrame(headAnimate);
	let now = Date.now();
	let elapsedMilliseconds = now - then2;
	let frameInterval = 1000/4;
	if(elapsedMilliseconds > frameInterval){
		then2 = now - (elapsedMilliseconds%frameInterval);
		// then(point0) ...... point1 .....now ....point2,
		//[point1 - then] is frameinterval, 
		// [now - then] is elapsedMilliseconds
		//move then to point1
		headC = (headC + 1) % 4;
		head.material = headmat[headC];
	}
}
animate();
oceanAnimate();
headAnimate();