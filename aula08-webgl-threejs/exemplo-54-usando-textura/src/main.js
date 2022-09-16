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
	200//Plano distante
);
camera.position.z = 100


const geometry = new THREE.BoxGeometry(20, 20, 20)
const texture = new THREE.TextureLoader()
			.load('img/crate.jpg',animate);
const material = new THREE.MeshBasicMaterial(
	{ map: texture });
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

function animate(){
    renderer.render(scene, camera)
	cube.rotation.y += .01
	cube.rotation.x += .01
	cube.rotation.z += .01
	requestAnimationFrame(animate)
}
animate()