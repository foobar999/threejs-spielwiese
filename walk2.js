
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


function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    controls = createControls(camera);
    
    // world
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    // TODO fog sp�ter f�r Wolken/Nebel reinhacken
    //scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    /*
    var geometry = new THREE.CylinderGeometry(0, 10, 30, 4, 1);
    var material = new THREE.MeshPhongMaterial({color: 0xffffff, flatShading: true});

    for (var i = 0; i < 500; i ++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 1000;
        mesh.position.y = (Math.random() - 0.5) * 1000;
        mesh.position.z = (Math.random() - 0.5) * 1000;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add(mesh);
    }
    */
    
    scene.add(buildAxes(1000));
    
    var houseSize = 10;
    var houseGeometry = new THREE.BoxGeometry(houseSize, houseSize, houseSize);
    var houseMaterial = new THREE.MeshPhongMaterial({ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30});
    var house = new THREE.Mesh(houseGeometry, houseMaterial);
    scene.add(house);

    // erzeuge Hausdach
    var radius = houseSize/2*Math.sqrt(2);    // radius ist hier Distanz Ecke-Mitte
    var height = 5;
    var roofGeometry = new THREE.CylinderGeometry(0, radius, height, 4, 1);
    var roof = new THREE.Mesh(roofGeometry, houseMaterial);
    roof.position.set(0, 10, 0);
    roof.rotation.y += Math.PI/4;
    scene.add(roof);
    

    // lights
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    var light = new THREE.DirectionalLight(0x002288);
    light.position.set(-1, -1, -1);
    scene.add(light);

    var light = new THREE.AmbientLight(0x222222);
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


