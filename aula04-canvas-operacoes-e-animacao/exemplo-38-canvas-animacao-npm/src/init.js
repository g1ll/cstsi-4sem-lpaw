import Quad from "./geometries/Quad"
import redCirc from "./geometries/redCirc"

let CTX
let CANVAS
const FRAMES = 15

let quad = new Quad(0,45,10)

const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.clearRect(0,0,CANVAS.width,CANVAS.height)
		
		quad.move({
			width:CANVAS.width,
			height:CANVAS.height
		})

		quad.draw(CTX)
		redCirc(CTX)

		requestAnimationFrame(loop)
	}, 1000/FRAMES)
}

export { init}