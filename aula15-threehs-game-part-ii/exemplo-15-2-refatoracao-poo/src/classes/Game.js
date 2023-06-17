import {
	AmbientLight,
	Color,
	PerspectiveCamera,
	PointLight,
	Scene,
	WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SkyBox from "./SkyBox";
import Airplane from './Airplane';
import Enemy from './Enemy';

let gameInstance;

export default class Game {

	#worldSize = 200
	#skyPath = 'bluesky'
	#modelsPath = 'assets/f15c/'
	#enemyMaterials = 'f15c_e.mtl'
	#enemyObject = 'f15c.obj'
	#jetMaterials = 'f15c.mtl'
	#jetObject = 'f15c.obj'
	#sky;
	#enemies;
	#jet;

	constructor(element) {
		!gameInstance && this.init(element)
		return gameInstance
	}

	init(element) {
		console.log('Initializing game...')
		this.IS_PAUSED = false
		this.IS_GAMEOVER = false
		this.QTD_ENEMIES = 10
		this.HIT_RADIUS = .125
		gameInstance = this

		this.#createRenderer(element)
		this.#createWorld().then(() => {
			this.createInputsListeners()
			this.loop()
		})
	}

	#createRenderer(el = window) {
		this.container = !el?.appendChild ? document.body : el
		this.screenHeight = !el?.clientHeight ? window.innerHeight : el?.clientHeight
		this.screenWidth = !el?.clientWidth ? window.innerWidth : el?.clientWidth
		this.renderer = new WebGLRenderer({ antialias: true })
		this.renderer.setSize(this.screenWidth, this.screenHeight)
		this.container.appendChild(this.renderer.domElement)
	}

	async #createWorld() {
		this.#createScene()
		this.#createCameras()
		this.#createLights()

		this.#sky = new SkyBox(this.#skyPath, this.#worldSize)

		this.#enemies = Array.from({ length: this.QTD_ENEMIES })
			.map(() => new Enemy(
				this.#modelsPath,
				this.#enemyMaterials,
				this.#enemyObject,
				this
			))

		this.#jet = new Airplane(
			this.#modelsPath,
			this.#jetMaterials,
			this.#jetObject,
			this, this.HIT_RADIUS / 2)

		try {
			await Promise.all(this.#enemies.map(async e => e.isLoaded()))
			await this.#jet.isLoaded()
			await this.#sky.create(this.scene);
		} catch (error){
			console.error(`Erro ao carregar assets! ${error.message()}`)
		}
	}

	#createScene() {
		this.scene = new Scene()
		this.scene.background = new Color(0x000000)
	}

	#createCameras() {
		this.camera = new PerspectiveCamera(
			45, this.screenWidth / this.screenHeight, 0.1, 1000
		);

		this.camera.position.z = 2
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enabled = false
	}

	#createLights() {
		this.light = new AmbientLight(0xffffff, 10);
		this.scene.add(this.light);
		this.plight = new PointLight(0xffffff, 50, 50);
		this.plight.position.set(0, 25, -10);
		this.scene.add(this.plight);
	}

	loop() {
		if (!this.IS_PAUSED && !this.IS_GAMEOVER) {
			this.#jet.update()
			this.#enemies.forEach((enemy) => {
				enemy.move()
				if (gameInstance.#jet.shootDown(enemy)) {
					gameInstance.IS_GAMEOVER = true;
					console.error("COLIDIU!!")
					gameInstance.controls.enabled = true
					gameInstance.scene.add(enemy.hitModel)
				}
			})
		}
		this.controls.update();
		this.renderer.render(this.scene, this.camera)
		requestAnimationFrame(() => gameInstance.loop())
	}

	createInputsListeners() {
		window.addEventListener('keydown', e => gameInstance.#keyboardInput(e))
		window.addEventListener('keyup', () => { gameInstance.key = null })
		window.addEventListener('click', e => gameInstance.#mouseClickInput(e));
		window.addEventListener('mousemove', e => gameInstance.#mouseMoveInput(e))
		window.addEventListener('resize', () => gameInstance.#resizeScreen(), false);
	}

	#keyboardInput(event) {
		this.key = event.key
		if (this.key === "p")
			this.IS_PAUSED = !this.IS_PAUSED
		if (this.IS_PAUSED) {
			this.#moveCamera()
		} else {
			this.controls.enabled && this.camera.position.set(0, 0, 2)
		}
	}

	#mouseClickInput(event) {
		this.mouse = {
			click: true,
			x: event.clientX,
			y: event.clientY,
		}
		setTimeout(() => this.mouse.click = false, 100)
	}

	#mouseMoveInput(event) {
		this.mouse = {
			click: false,
			x: event.clientX,
			y: event.clientY,
		}
	}

	#resizeScreen() {
		console.log([this.screenWidth, this.screenHeight])
		this.camera.aspect = this.screenWidth / this.screenHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.screenWidth, this.screenHeight);
	}

	#moveCamera() {
		switch (this.key) {
			case "ArrowUp":
				this.camera.position.z -= 1;
				break;
			case "ArrowDown":
				this.camera.position.z += 1;
				break;
			case "ArrowLeft":
				this.camera.position.x -= 1;
				break;
			case "ArrowRight":
				this.camera.position.x += 1;
				break;
		}
	}
}