import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

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

camera.position.z = 2

// //Luz
var light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);

//Ponto de Luz
const plight = new THREE.PointLight(0xffffff, 10);
plight.position.set(10,1,0)
plight.distance=10
scene.add(plight);

const helper = new THREE.PointLightHelper(plight)
scene.add(helper)


const modelPath = 'models/suzanne/'
const objFile = 'suzanne.obj'

const manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
};

const objLoader = new OBJLoader(manager);

const monkey = {};

objLoader.setPath(modelPath)
  .load(objFile, (object) => {
    // object.traverse(child =>child.material?.color.setHex(0x0000ff));
    // object.traverse(child =>{
    //   child.material = new THREE.MeshStandardMaterial({color: 0x00ff00 })
    //   return child
    // });
    monkey.model = object
    scene.add(object)
    animate()
  })

function animate() {
  plight.position.x-=.1
  monkey.model.rotation.y+=.01
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}