import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

let aspecto = window.innerWidth/ window.innerHeight
const camera = new THREE.PerspectiveCamera(
	75, //campo de visao vertical
	aspecto, //aspecto da imagem (Largura/Altura)
	0.1, //Plano proximo
	100//Plano distante
);
camera.position.z = 35

const geometry = new THREE.BoxGeometry(20, 20, 20)
const cor = {color:0x0000ff};
const material = new THREE.MeshBasicMaterial(cor)
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

cube.position.z = -50;
cube.position.x = 50;
cube.position.y = 50;

// cube.rotation.x += .5
// 	cube.rotation.y += .5
// 	cube.rotation.z += .5
// renderer.render(scene, camera)
const animate=()=>{
    renderer.render(scene, camera)
	cube.rotation.x += .01
	cube.rotation.y += .01
	cube.rotation.z += .1
	requestAnimationFrame(animate)
}
animate()