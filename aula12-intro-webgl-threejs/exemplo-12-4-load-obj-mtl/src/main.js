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
camera.position.z = 1.3

//Luz
var light = new THREE.AmbientLight(0xffffff, 5);
scene.add(light);

//Ponto de Luz
var plight = new THREE.PointLight(0xffffff, 50);
plight.position.set(10, 10, -10);
scene.add(plight);

let jet //referencia global ao modelo f15
const modelPath = 'models/f15c/'
const mtlFile = 'f15c.mtl'
const objFile = 'f15c.obj'

const manager = new THREE.LoadingManager()
const mtlLoader = new MTLLoader(manager)
const objLoader = new OBJLoader()

manager.onProgress = (item, loaded, total)=> {
  let percentLoaded = Number(loaded/total*100).toFixed()
  console.log(item, percentLoaded+'%')
};

mtlLoader.setPath(modelPath)
  .load(mtlFile, handleMaterialLoaded)

function handleMaterialLoaded(materials) {
  materials.preload()
  objLoader.setMaterials(materials)
  objLoader.setPath(modelPath)
    .load(objFile, handleObjectLoaded)
}

function handleObjectLoaded(object) {
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
  jet.rotation.z += .05
  requestAnimationFrame(animate)
}