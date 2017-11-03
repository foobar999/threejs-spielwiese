
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// weißer Hintergrund
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);

// erzeuge Haus
var houseSize = 10;
var houseGeometry = new THREE.BoxGeometry(houseSize, houseSize, houseSize);
var houseMaterial = new THREE.MeshPhongMaterial({ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30});
var house = new THREE.Mesh(houseGeometry, houseMaterial);
scene.add(house);

/*
// erzeuge Hausdach
var radius = houseSize/2*Math.sqrt(2);    // radius ist hier Distanz Ecke-Mitte
var height = 5;
var roofGeometry = new THREE.CylinderGeometry(0, radius, height, 4, 1);
var roof = new THREE.Mesh(roofGeometry, houseMaterial);
roof.position.set(0, 10, 0);
roof.rotation.y += Math.PI/4;
scene.add(roof);
*/

// gerichtete Lichtquelle: entspricht Sonne: parallele Lichtstrahlen unendlich weit weg in 1 Richtung
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(10, 20, 30);
light.target = house;
scene.add(light);

/*
camera.position.set(9, 11, 13);
camera.lookAt(new THREE.Vector3(0, 0, 0));

renderer.render(scene, camera);
*/




/*
function animate() {
	requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
	renderer.render(scene, camera);
}
animate();
*/





