import { LoadingManager } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export default class Model3D {
	constructor(modelPath, mtlFile, objFile) {
		this.IS_LOADING = true
		this.modelPath = modelPath
		this.mtlFile = mtlFile
		this.objFile = objFile
		this.manager = new LoadingManager()
		this.manager.onProgress = (item, loaded, total) => {
			console.log('Model3D loading:', item, loaded, total);
		};
	}

	async _create(scene = null) {
		const mtlLoader = new MTLLoader(this.manager);
		const objLoader = new OBJLoader();
		mtlLoader.setPath(this.modelPath)
		objLoader.setPath(this.modelPath)
		objLoader.setMaterials(await mtlLoader.loadAsync(this.mtlFile))
		this.model = await objLoader.loadAsync(this.objFile)
		this.IS_LOADING = false
		if(scene) return scene.add(this.model)
		return this.model
	}

	isLoaded(){
		return new Promise((resolve,reject)=>{
			const interval = setInterval(()=>{
				console.log('Interval: ',this.IS_LOADING)
				if(!this.IS_LOADING){
					clearInterval(interval)
					console.log('Interval OFF: ',this.IS_LOADING)
					resolve(true)
				}
			},1000)
			setTimeout(()=>{reject(false)},60000)
		})
	}
}