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

const hitRadius = .125;
const sphere_geometry = new THREE.SphereGeometry(hitRadius / 2, 64, 32);
const sphereColor = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(sphere_geometry, sphereColor);
const hitSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), hitRadius)

jet.shots = new Array()

const enemiesQtd = 10
const enemies = Array.from({ length: enemiesQtd }).map(() => ({
  model: enemy.clone(),
  hit: hitSphere.clone(),
}))
enemies.forEach(enemy => scene.add(enemy.model))

function moveEnemy(enemy) {
  enemy.model.position.z += 0.5
  if (enemy.model.position.z > 100) {
    enemy.model.position.z = -(Math.random() * 500 + 100)
    enemy.model.position.x = Math.random() * (Math.random() > .5 ? 5 : -5);
  }
  enemy.hit.center.copy(enemy.model.position)
}

function fire() {
  const shot = {
    rx: jet.rotation.z,
    ry: jet.rotation.x,
    model: sphere.clone(),
    hit: hitSphere.clone(),
  }
  shot.hit.radius = hitRadius / 2
  shot.model.material.transparent = true
  shot.model.material.opacity = .5
  shot.model.material.emissive = new THREE.Color(0xffff00)
  shot.model.material.roughness = .5
  shot.model.material.metalness = 1
  shot.model.position.set(...jet.position)
  shot.hit.center.copy(shot.model.position)
  scene.add(shot.model)
  jet.shots.push(shot)
}

function updateShots() {
  if (jet.shots.length > 0) {
    jet.shots.forEach((shot) => {
      shot.model.position.z -= 1
      shot.model.position.x += -shot.rx / 2
      shot.model.position.y += shot.ry / 5
      shot.hit.center.copy(shot.model.position)
    })
    jet.shots = jet.shots.filter((shot) => {
      if (shot.model.position.z < -100) {
        scene.remove(shot.model)
        return false
      }
      return true
    })
  }
}

let GAME_PAUSED = false


function shootDown(enemy) {
  if (jet.shots.length == 0) return false;
  return jet.shots.find(shot => shot.hit.intersectsSphere(enemy.hit))
}

function showEnemyHit(enemy){
  const sphere_geometry = new THREE.SphereGeometry(hitRadius, 64, 32);
  const sphereColor = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const newSphere = new THREE.Mesh(sphere_geometry, sphereColor);
  newSphere.material.transparent = true
  newSphere.material.opacity = .25
  newSphere.position.copy(enemy.hit.center)
  scene.add(newSphere)
  camera.position.copy(enemy.hit.center)
  camera.position.z-=5
  camera.position.y+=1
  controls.object.position.copy(camera.position);
  controls.target = enemy.model.position
}

controls.enabled = false 
animate()

function animate() {
  controls.update()
  if (!GAME_PAUSED) {
    moveJet()
    updateShots()
    enemies.forEach(e => {
      moveEnemy(e)
      if (shootDown(e)) {
        showEnemyHit(e)
        GAME_PAUSED = true
        controls.enabled = true
        console.error('COLIDIU!!!')
      }
    })
  }
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

function updateJoystick(event) {
  if (!event.buttons) {
    jetJoystick.x = event.clientX
    jetJoystick.y = event.clientY
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

window.addEventListener('mousemove', updateJoystick)

window.addEventListener('keydown', evento => {
  if (evento.key == ' ' || evento.key == 'Enter')
    fire()
});