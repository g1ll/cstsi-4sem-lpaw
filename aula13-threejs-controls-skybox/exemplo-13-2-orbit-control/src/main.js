import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
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

camera.position.z = 1.2
const controls = new OrbitControls(camera, renderer.domElement);

//Luz
const light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);

//Ponto de Luz
const plight = new THREE.PointLight(0xffffff, 10);
plight.position.set(10, 10, 0);
scene.add(plight);

const modelPath = 'models/f15c/'
const mtlFile = 'f15c.mtl'
const objFile = 'f15c.obj'

const manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
};

const mtlLoader = new MTLLoader(manager);
const objLoader = new OBJLoader();

// mtlLoader.setPath(modelPath)
//   .load(mtlFile, (materials) => {
//     materials.preload()
//     objLoader.setMaterials(materials)
//     objLoader.setPath(modelPath)
//       .load(objFile, (object) => {
//         object.rotation.x = 0
//         object.rotation.y = 1.5
//         scene.add(object)
//         animate()
//       })
//   })

const material = await mtlLoader.setPath(modelPath).loadAsync(mtlFile)
material.preload(material)
objLoader.setMaterials(material)
const object = await objLoader.setPath(modelPath).loadAsync(objFile)
object.rotation.x = 0
object.rotation.y = 1.5
scene.add(object)

animate()


function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}