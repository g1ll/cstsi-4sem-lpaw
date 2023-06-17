//adaptado de: https://codinhood.com/post/create-skybox-with-threejs
import {
	TextureLoader,
	MeshBasicMaterial,
	BackSide,
	BoxGeometry,
	Mesh
} from 'three'

export default class SkyBox {
	constructor(filename, size) {
		this.filename = filename
		this.size = size
		this.#createPathStrings()
	}

	setSize(size) {
		this.size = size
	}

	async create(scene) {
		try {
			const skyboxGeo = new BoxGeometry(this.size, this.size, this.size);
			await this.#createSkyBoxMaterial()
			console.log("Material ready!")
			this.model = new Mesh(skyboxGeo, this.materialArray);
			scene.add(this.model)
		}catch(error){
			throw Error(`Erro ao carregar texturas! ${error.message()}`)
		}
	}

	#createPathStrings() {
		const basePath = "img/skyboxes/";
		const baseFilename = basePath + this.filename;
		const fileType = ".png";
		const sides = ["ft", "bk", "up", "dw", "lf", "rt"];
		this.skyBoxImagePaths = sides.map(side => {
			return baseFilename + "/" + side + fileType;
		});
		console.log(this.skyBoxImagePaths)
	}

	async #createSkyBoxMaterial() {
		this.materialArray = []
		for (let imagePath of this.skyBoxImagePaths) {
			console.log(`Loading: ${imagePath}`)
			let loader = new TextureLoader();
			let texture = await loader.loadAsync(imagePath);
			this.materialArray.push(
				new MeshBasicMaterial(
					{ map: texture, side: BackSide }
				));
			console.log(`Loaded: ${imagePath}`)
		}
	}
}