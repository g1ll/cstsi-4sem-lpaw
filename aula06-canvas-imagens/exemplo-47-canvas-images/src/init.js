import Quad from "./geometries/Quad"
import Rect from "./geometries/Rect"

import { keyPress, key } from "./keyboard"
import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 15

let goblinImage = null

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	keyPress(CANVAS)
	goblinImage = await loadImage('img/goblin.png')
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.clearRect(0,0,CANVAS.width,CANVAS.height)
		
		CTX.drawImage(
			goblinImage,
			0,0,165,174, //source
			100,10,165,174 //draw
		)

		requestAnimationFrame(loop)
	}, 1000/FRAMES)
}

export { init}