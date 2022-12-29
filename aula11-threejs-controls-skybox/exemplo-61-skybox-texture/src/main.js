import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { createSkyBox } from './skybox';

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(
  40, window.innerWidth / window.innerHeight, 0.1, 1000
);

camera.position.z = 1

//Resimensionamento da camera ao redimensionar a tela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  console.log(`Resize: ${camera.aspect}`)
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

const controls = new OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);

var plight = new THREE.PointLight(0xffffff, 50, 50);
plight.position.set(0, 25, -10);
scene.add(plight);

let model
const modelPath = 'models/f15c/'
const mtlFile = 'f15c.mtl'
const objFile = 'f15c.obj'

const manager = new THREE.LoadingManager();
manager.onProgress = (item, loaded, total) => {
  console.log(item, loaded, total);
};

const mtlLoader = new MTLLoader(manager);
const objLoader = new OBJLoader();

mtlLoader.setPath(modelPath)
  .load(mtlFile, (materials) => {
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.setPath(modelPath).load(objFile, (object) => {
      model = object
      model.scale.setScalar(.5)//redimensiona o objeto
      model.position.x = .05
      model.rotation.z = .5
      scene.add(model)
      createSkyBox('bluesky', 70).then(sky => {
        console.log('sky created')
        console.log(sky)
        scene.add(sky)
        animate()
      });
    })
  })

function animate() {
  controls.update();
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

window.addEventListener('mousemove', event => {
  if (!event.buttons) {
    let wh = window.innerHeight
    let ww = window.innerWidth
    let my = event.clientY
    let mx = event.clientX
    if (model) model.rotation.x += (my - wh / 2) / wh / 100
    if (model) model.rotation.z -= (mx - ww / 2) / ww / 100
  }
})