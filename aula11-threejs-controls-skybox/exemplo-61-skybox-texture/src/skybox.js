//adaptado de: https://codinhood.com/post/create-skybox-with-threejs
import {
	TextureLoader,
	MeshBasicMaterial,
	BackSide,
	BoxGeometry,
	Mesh } from 'three'

const createPathStrings = (filename) => {
	const basePath = "img/skyboxes/";
	const baseFilename = basePath + filename;
	const fileType = ".png";
	const sides = ["ft", "bk", "up", "dw", "lf","rt"];
	const pathStings = sides.map(side => {
		return baseFilename + "/" + side + fileType;
	});
	console.log(pathStings)
	return pathStings;
}

const createSkyBoxMaterial = async (filename) => {
	const skyboxImagepaths = createPathStrings(filename);
	console.log(skyboxImagepaths)
	const materialArray = []
	for(let image of skyboxImagepaths){
		console.log(`Loading: ${image}`)
		let loader = new TextureLoader();
		let texture = await loader.loadAsync(image);
		materialArray.push(new MeshBasicMaterial(
			{ map: texture, side: BackSide }));
		console.log(`Loaded: ${image}`)
	}
	return materialArray;
}

const createSkyBox = async (filename,size) => {
	const skyboxGeo = new BoxGeometry(size, size, size);
	const skyArrayMaterial = await createSkyBoxMaterial(filename)
	console.log("Material ready!")
	return new Mesh(skyboxGeo, skyArrayMaterial);
}

export { createSkyBox }