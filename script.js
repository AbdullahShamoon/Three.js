const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

// mesh.rotation.x = 1;
// mesh.scale.x = 1.5;
// mesh.position.y = 1;

scene.add(mesh);


camera.position.z = 5;

const canvas = document.querySelector('#draw');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // antialias: true for smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


const clock = new THREE.Clock();  // Used to get time in seconds from when the page is loaded
function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // mesh.rotation.y += 0.01;    // Cube will rotate in y axis , different pc will have different speed w.r.t its FPS

    mesh.rotation.y = clock.getElapsedTime();

}

animate();


// Now we will see how to use this in bundler ...
// Go to that folder to see