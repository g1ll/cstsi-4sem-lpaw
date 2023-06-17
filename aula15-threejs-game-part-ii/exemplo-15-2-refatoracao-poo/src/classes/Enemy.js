import { Mesh, MeshBasicMaterial, Sphere, SphereGeometry } from "three";
import Model3D from "./Model3D";

export default class Enemy extends Model3D {
	constructor(modelPath, mtlFile, objFile, GAME) {
		super(modelPath, mtlFile, objFile)
		this.GAME = GAME
		this._create(this.GAME.scene).then(() => {
			this.model.scale.setScalar(.5)//redimensiona o objeto
			this.model.position.y = .4
			this.model.position.z = -(Math.random() * 1000 + 100)
			this.model.position.x = Math.random() * (Math.random() > .5 ? 5 : -5);
			this.model.rotateY(3.14)
			this.setHit()
		})
	}

	setHit() {
		const sphere_geometry = new SphereGeometry(this.GAME.HIT_RADIUS, 64, 32);
		const sphereColor = new MeshBasicMaterial({ color: 0xff0000 });
		this.hitModel = new Mesh(sphere_geometry, sphereColor);
		this.hitModel.material.transparent = true
		this.hitModel.material.opacity = .25
		this.hitModel.position.copy(this.model.position)
		this.hit = new Sphere(this.model.position, this.GAME.HIT_RADIUS)
	}

	move() {
		if (!this.IS_LOADING) {
			this.model.position.z += 0.5
			if (this.model.position.z > 100) {
				this.model.position.z = -(Math.random() * 1000 + Math.random()*100)
				this.model.position.x = Math.random() * (Math.random() > .5 ? 5 : -5);
			}
			this.hit.center.copy(this.model.position)
			this.hitModel.position.copy(this.model.position)
		}
	}
}