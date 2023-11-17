import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

let aspecto = window.innerWidth / window.innerHeight
const camera = new THREE.PerspectiveCamera(
  75, //campo de visao vertical
  aspecto, //aspecto da imagem (Largura/Altura)
  .1, //Plano proximo
  100//Plano distante
);
camera.position.z = 40

//Luz
const light = new THREE.AmbientLight(0xffffff,5);
scene.add(light);


//Ponto de Luz
let p = 30
const plight = new THREE.PointLight(0xffffff, 50);
plight.position.set(p,5,5)
scene.add(plight);

const sphere_geometry = new THREE.SphereGeometry(1, 64, 32);
const sphereColor = new THREE.MeshBasicMaterial({color: 0xffff00 });
const sphere = new THREE.Mesh(sphere_geometry, sphereColor);
sphere.position.set(p,5,5)
scene.add(sphere);

let jet //referencia global ao modelo f15
const modelPath = 'models/f15c/'
const mtlFile = 'f15c.mtl'
const objFile = 'f15c.obj'

const manager = new THREE.LoadingManager()
const mtlLoader = new MTLLoader(manager)
const objLoader = new OBJLoader()

manager.onProgress = (item, loaded, total) => {
  let percentLoaded = Number(loaded / total * 100).toFixed()
  console.log(item, percentLoaded + '%')
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
  jet.position.x = 0
  jet.position.y = -.15
  jet.position.z = 25
  jet.rotation.y = 3.14 + 1.57
  // jet.rotateY(.78)
  jet.rotateZ(-.78)
  // jet.rotateX(.78)
  // jet.position.set(1,1,1)
  jet.scale.setScalar(7)
  scene.add(jet)
  animate()
}

function movePointLight(){
  p-=.2
  if(p< -30) p = 30
  plight.position.set(p,5,25)
  sphere.position.set(p,5,25)
}

function animate() {
  renderer.render(scene, camera)
  movePointLight()
  requestAnimationFrame(animate)
}