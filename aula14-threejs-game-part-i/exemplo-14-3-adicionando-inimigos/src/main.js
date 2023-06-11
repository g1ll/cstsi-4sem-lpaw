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

camera.position.z = 2

//Resimensionamento da camera ao redimensionar a tela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // console.log(`Resize: ${camera.aspect}`)
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.AmbientLight(0xffffff, 10);
scene.add(light);

const plight = new THREE.PointLight(0xffffff, 50, 50);
plight.position.set(0, 25, -10);
scene.add(plight);

//criacao do skybox
const skyBox = await createSkyBox('bluesky', 200)
skyBox.position.y = 1
scene.add(skyBox)

const jetPath = 'models/f15c/'
const mtlFile = 'f15c.mtl'
const objFile = 'f15c.obj'

const manager = new THREE.LoadingManager();
manager.onProgress = (item, loaded, total) => {
  console.log(item, loaded, total);
};

const mtlLoader = new MTLLoader(manager);
const objLoader = new OBJLoader();

mtlLoader.setPath(jetPath)
objLoader.setPath(jetPath)

objLoader.setMaterials(await mtlLoader.loadAsync(mtlFile))
const jet = await objLoader.loadAsync(objFile)
const jetJoystick = { x: null, y: null }
jet.scale.setScalar(.5)//redimensiona o objeto
jet.position.y = -.2
scene.add(jet)

//enemy
const enemyMtlFile = 'f15c_e.mtl'
const enemyMtlLoader = new MTLLoader(manager);
const enemyObjLoader = new OBJLoader();

//carregamento assincrono com promises
enemyMtlLoader.setPath(jetPath)
enemyObjLoader.setPath(jetPath)

enemyObjLoader.setMaterials(await enemyMtlLoader.loadAsync(enemyMtlFile))
const enemy = await enemyObjLoader.loadAsync(objFile)
enemy.scale.setScalar(.5)//redimensiona o objeto

enemy.position.y = .4
enemy.position.z = -(Math.random() * 100 + 10)
enemy.position.x = Math.random() * (Math.random() > .5 ? 5 : -5);
enemy.rotateY(3.14)

const enemiesQtd = 10
const enemies = Array.from({ length: enemiesQtd }).map(()=>enemy.clone())
enemies.forEach(enemy =>scene.add(enemy))

function moveEnemy(enemy) {
  enemy.position.z += 0.5
  if (enemy.position.z > 100) {
    enemy.position.z = -(Math.random() * 500 + 100)
    enemy.position.x = Math.random() * (Math.random() > .5 ? 5 : -5);
  }
}

animate()

function animate() {
  controls.update();
  moveJet()
  enemies.forEach(e=>moveEnemy(e))
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

function updateJoystick(event) {
  if (!event.buttons) {
    jetJoystick.x = event.clientX
    jetJoystick.y = event.clientY
    console.log(jetJoystick)
  } else {
    jetJoystick.x = null
    jetJoystick.y = null
  }
}

function moveJet() {
  if (jet
    && jetJoystick.x
    && jetJoystick.y) {

    let wh = window.innerHeight
    let ww = window.innerWidth

    jet.rotation.x += (jetJoystick.y - wh / 2) / wh / 100

    if (Math.abs(jet.position.x) > 1) {
      jet.position.x = 1 * (jet.position.x / Math.abs(jet.position.x))
    } else {
      jet.rotation.z -= (jetJoystick.x - ww / 2) / ww / 10
    }

    if (Math.abs(jet.rotation.z) != 0) {
      jet.position.x += (jetJoystick.x - ww / 2) / ww / 10
      jet.rotation.y = jet.rotation.z / 2.5
    }

    if (Math.abs(jet.rotation.y) > .5)
      jet.rotation.y = .5 * (jet.rotation.y / Math.abs(jet.rotation.y))
  }
}

window.addEventListener('click',evento=>{
  console.log(evento.clientX)
});

window.addEventListener('mousemove', updateJoystick)