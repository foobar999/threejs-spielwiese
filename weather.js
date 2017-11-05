
var container;
var camera, controls, scene, renderer;
var cross;

init();
animate();

function createControls(camera){
    var controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 10.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    // a, s, d
    controls.keys = [65, 83, 68];

    controls.addEventListener('change', render);
    return controls;
}


function createHouse(houseSize){
    var houseGeometry = new THREE.BoxGeometry(houseSize, houseSize, houseSize);
    var houseMaterial = new THREE.MeshPhongMaterial({ambient: 0x050505, color: 0x724b33, specular: 0x555555, shininess: 30});
    return new THREE.Mesh(houseGeometry, houseMaterial);
}


function createRoof(roofSize, roofHeight){
    var roofRadius = roofSize/2*Math.sqrt(2); // "radius" ist hier Distanz Ecke-Mitte
    var roofGeometry = new THREE.CylinderGeometry(0, roofRadius, roofHeight, 4, 1);
    var roofMaterial = new THREE.MeshPhongMaterial({ambient: 0x050505, color: 0xc62411, specular: 0x555555, shininess: 30});
    var roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.rotation.y += Math.PI/4;
    return roof;
}


function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    controls = createControls(camera);
    
    // world
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    // TODO fog später für Wolken/Nebel reinhacken
    //scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    // füge Achsen ein
    //scene.add(buildAxes(1000));
    scene.add(new THREE.AxisHelper(1000));
    
    // kann auch die Achsen einzelner Objekte darstellen:
    // roof.add(new THREE.AxisHelper(1000));
    
    // Länge & Breite 
    var houseSize = 10;
    var house = createHouse(houseSize);
    scene.add(house);

    // erzeuge Hausdach
    var roofHeight = 5;
    var roof = createRoof(houseSize, roofHeight);
    roof.position.set(0, 7.5, 0);
    scene.add(roof);    
    
    // lights
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    var light = new THREE.AmbientLight(0x222222);
    scene.add(light);
    
    var light = new THREE.DirectionalLight(0x002288);
    light.position.set(-1, -1, -1);
    scene.add(light);


    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    
    render();
}

// TODO kicken?
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}


