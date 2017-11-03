
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// weißer Hintergrund
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);

// Würfel mit Phong-Oberfläche
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// gerichtete Lichtquelle: entspricht Sonne: parallele Lichtstrahlen unendlich weit weg in 1 Richtung
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 1, 1);
light.target = cube;
scene.add(light);

camera.position.set(1, 1, 1);
camera.lookAt(new THREE.Vector3(0, 0, 0));


function animate() {
	requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
	renderer.render(scene, camera);
}
animate();
