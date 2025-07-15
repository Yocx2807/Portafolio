let scene, camera, renderer, textMesh;

init();
animate();

function init() {
  const container = document.getElementById('canvas-container');
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1000);
  camera.position.z = 180;

  // Luces
  const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xffcc66, 1.5);
  pointLight1.position.set(50, 100, 50);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x66ccff, 1.0);
  pointLight2.position.set(-50, -50, 100);
  scene.add(pointLight2);

  // Fuente y texto
  const loader = new THREE.FontLoader();
  loader.load('	https://threejs.org/examples/fonts/gentilis_bold.typeface.json', function(font) {
    const geometry = new THREE.TextGeometry('Yocxany Chaves', {
      font: font,
      size: 18,
      height: 5,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.7,
      bevelSize: 0.4,
      bevelSegments: 4
    });
    geometry.center();

    const material = new THREE.MeshStandardMaterial({
      color: 0xFFC300,
      metalness: 1.0,
      roughness: 0.2,
      emissive: 0xb4a329,
      emissiveIntensity: 0.3
    });

    textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.x = 70;
    scene.add(textMesh);
  });

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // transparente
  document.body.appendChild(renderer.domElement);


  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  if (textMesh) textMesh.rotation.y += 0.007;
  renderer.render(scene, camera);
}