import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

let aspecto = window.innerWidth / window.innerHeight
const camera = new THREE.PerspectiveCamera(
  75, //campo de visao vertical
  aspecto, //aspecto da imagem (Largura/Altura)
  0.1, //Plano proximo
  100//Plano distante
);
camera.position.z = 1.5

//Luz
var light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);

//Ponto de Luz
var plight = new THREE.PointLight(0xffffff, 10);
plight.position.set(10, 10, 0);
scene.add(plight);

const modelPath = 'models/f15c/'
const mtlFile = 'f15c.mtl'
const objFile = 'f15c.obj'
let jet

const manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
};

const mtlLoader = new MTLLoader(manager);
const objLoader = new OBJLoader();

mtlLoader.setPath(modelPath)
  .load(mtlFile, handleMaterial)

function handleMaterial(materials) {
  materials.preload()
  objLoader.setMaterials(materials)
  objLoader.setPath(modelPath)
    .load(objFile, handleObject)
}

function handleObject(object) {
  jet = object
  jet.position.x = -.5
  jet.position.y = .25
  jet.position.z = .5
  jet.rotation.y = .78
  jet.rotateZ(.78)
  jet.rotateX(.78)
  jet.scale.setScalar(.5)
  scene.add(jet)
  animate()
}

function animate() {
  renderer.render(scene, camera)
  jet.rotation.z += .01
  requestAnimationFrame(animate)
}