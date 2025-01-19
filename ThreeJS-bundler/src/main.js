import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as lil from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// CUBE :-
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 , wireframe: true});  // wireframe: true for wireframe
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// SPHERE :-
// const geometry = new THREE.SphereGeometry( 1 , 15 , 15 ); 

// CYLINDER :- 
// const geometry = new THREE.CylinderGeometry( 2, 2, 3, 10 ,10 , true );  // CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 , wireframe: false , side: THREE.DoubleSide } );  // side: THREE.DoubleSide for showing both sides 
// const sphere = new THREE.Mesh( geometry, material ); 
// scene.add( sphere );


// //  Material 
// const loader = new THREE.TextureLoader();
// let color = loader.load("../texture/color.jpg")
// let roughness = loader.load("../texture/roughness.jpg")
// let normal = loader.load("../texture/normal.jpg")
// let height = loader.load("../texture/height.jpg")

// // MeshStandardMaterial
// const geometry = new THREE.BoxGeometry(3, 2, 2);
// const material = new THREE.MeshStandardMaterial({ map: color, roughnessMap: roughness , normalMap: normal , displacementMap: height });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// // add directional light with high intensity
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(1, 1, 1);
// scene.add(directionalLight);

// // add  point light
// const pointLight = new THREE.PointLight(0xffffff, 2 ,10,1);
// pointLight.position.set(0, 5, 0);
// scene.add(pointLight);

// // create ambient light to create base level of light
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// // add light helper for all lights
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(directionalLightHelper);

// // add point light helper
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.4);
// scene.add(pointLightHelper);


// camera.position.z = 5;

// const canvas = document.querySelector('canvas');
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setSize(window.innerWidth, window.innerHeight);


// // Makes the canvas responsive to window size
// window.addEventListener('resize', () => {
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;  // Make the camera move smoother
// // controls.autoRotate = true;
// // controls.autoRotateSpeed = 5;
// // controls.enableZoom = false;
// // controls.dampingFactor = 0.01;   // Make the stopping faster or slower


// const gui = new lil.GUI({ title: "Settings" });

// const materialFolder = gui.addFolder("Material");
// materialFolder.add(material, "metalness", 0, 1);
// materialFolder.add(material, "roughness", 0, 1);
// materialFolder.add(material, "displacementScale", 0, 1);

// const meshFolder = gui.addFolder("Mesh");
// meshFolder.add(cube.position, "x", -5, 5);
// meshFolder.add(cube.position, "y", -5, 5);
// meshFolder.add(cube.position, "z", -5, 5);

// const lightFolder = gui.addFolder("Light");
// lightFolder.add(pointLight.position, "x", -10, 10);
// lightFolder.add(pointLight.position, "y", -10, 10);
// lightFolder.add(pointLight.position, "z", -10, 10);

// const dlightFolder = gui.addFolder("Light");
// dlightFolder.add(directionalLight.position, "x", -10, 10);
// dlightFolder.add(directionalLight.position, "y", -10, 10);
// dlightFolder.add(directionalLight.position, "z", -10, 10);
// dlightFolder.add(directionalLight, "intensity", 0, 10);


// function animate() {
//   window.requestAnimationFrame(animate);
//   renderer.render(scene, camera);
//   // cube.rotation.x += 0.01;
//   // cube.rotation.y += 0.01;
//   controls.update();
// }

// animate();


camera.position.set(0, 0, 5);

//Set up the renderer

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas , antialias: true}); 
renderer.setSize(window.innerWidth, window.innerHeight);

// Add HDRI lightning
const rgebLoader = new RGBELoader()
rgebLoader.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_curve_sunset_1k.hdr",function(texture){
  texture.mapping = THREE.EquirectangularReflectionMapping;
  // scene.background = texture;
  scene.environment = texture;
})

// Add GLTF model
const loader = new GLTFLoader();
loader.load( './box_stylized.glb', function ( gltf ) {
	scene.add( gltf.scene );
} );

//Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add a basic cube to the scene
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();