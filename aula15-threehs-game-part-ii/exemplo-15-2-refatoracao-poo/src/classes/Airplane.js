import {
	Color,
	Mesh,
	MeshStandardMaterial,
	PointLight,
	Sphere,
	SphereGeometry,
	Vector3
} from "three";
import Model3D from "./Model3D";

export default class Airplane extends Model3D {
	constructor(modelPath, mtlFile, objFile, GAME, hitRadius = null) {
		super(modelPath, mtlFile, objFile)

		this.GAME = GAME

		this.joystick = { x: null, y: null }
		this.shots = new Array()

		this._create(this.GAME.scene).then(() => {
			this.model.scale.setScalar(.5)//redimensiona o objeto
			this.model.position.y = -.2
			this.GAME.camera.position.y = -this.model.position.y+.2
		})

		this.setHit(hitRadius)
		this.plightShot = new PointLight(0xffff00, 10);
		this.plightShot.position.set(1000, 1000, 1000);
	}

	setHit(hitRadius) {
		const radius = hitRadius ? hitRadius : this.GAME.HIT_RADIUS;
		const sphere_geometry = new SphereGeometry(radius, 64, 32);
		const sphereColor = new MeshStandardMaterial({ color: 0xffff00 });
		this.hitModel = new Mesh(sphere_geometry, sphereColor);
		this.hit = new Sphere(new Vector3(0, 0, 0), radius)
	}

	fire() {

		if (this.shots.length > 50)
			return;

		const shot = {
			model: this.hitModel.clone(),
			xa: this.model.rotation.z,
			ya: this.model.rotation.x,
			hit: this.hit.clone(),
		}

		shot.model.material.transparent = true
		shot.model.material.opacity = .5
		shot.model.material.emissive = new Color(0xffff00)
		shot.model.material.roughness = 0
		shot.model.material.metalness = 1
		shot.model.position.set(...this.model.position)
		shot.hit.center.copy(shot.model.position)
		console.log(shot)
		this.GAME.scene.add(shot.model)
		this.shots.push(shot)
		this.plightShot.position.z = this.model.position.z - 2
		this.plightShot.position.y = this.model.position.y + 1
		this.plightShot.position.x = this.model.position.x * 2
		this.GAME.scene.add(this.plightShot)
		setTimeout(() => this.GAME.scene.remove(this.plightShot), 100)
	}

	animeShots() {
		if (this.shots.length > 0) {
			this.shots.forEach((shot) => {
				shot.model.position.z -= 1
				shot.model.position.x += -shot.xa / 2
				shot.model.position.y += shot.ya / 5
				shot.hit.center.copy(shot.model.position)
			})
			this.shots = this.shots.filter((shot) => {
				if (shot.model.position.z < -100) {
					this.GAME.scene.remove(shot.model)
					return false
				}
				return true
			})
		}
	}

	shootDown(enemy) {
		if (this.shots.length == 0) return false;
		return this.shots.find(shot => shot.hit.intersectsSphere(enemy.hit))
	}

	move() {
		if (this.model
			&& this.joystick.x
			&& this.joystick.y) {

			let wh = window.innerHeight
			let ww = window.innerWidth
			let yAxis = (this.joystick.y - wh / 2) / wh / 100
			let xAxis = (this.joystick.x - ww / 2) / ww / 10

			let xPos = this.model.position.x
			let absXPos = Math.abs(this.model.position.x)
			let yRot = this.model.rotation.y
			let absYRot = Math.abs(this.model.rotation.y)
			let absZRot = Math.abs(this.model.rotation.z)

			this.model.rotation.x += yAxis

			if (absXPos > 1) {
				this.model.position.x = 1 * xPos / absXPos
			} else {
				this.model.rotation.z -= xAxis
			}

			if (absZRot != 0) {
				this.model.position.x += xAxis
				this.model.rotation.y = this.model.rotation.z / 2.5
			}

			if (absYRot > .5)
				this.model.rotation.y = .5 * yRot / absYRot

			this.model.position.y += this.model.rotation.x / 500
			this.GAME.camera.position.y = -this.model.position.y+.2
			this.GAME.camera.lookAt(0,this.model.position.y,2)
			this.GAME.camera.updateProjectionMatrix();
		}
		this.animeShots()
	}

	updateJoystick(event) {
		this.joystick.x = null
		this.joystick.y = null
		if (!event.buttons) {
			this.joystick.x = event.clientX
			this.joystick.y = event.clientY
		}
	}

	update() {
		const { x, y } = { ...this.GAME.mouse }
		this.joystick = { x, y }

		this.move()

		if ((this.GAME?.mouse?.click
			|| this.GAME.key === "Enter"
			|| this.GAME.key === " ")
			&& !this.GAME.IS_GAMEOVER)
			this.fire()
	}
}