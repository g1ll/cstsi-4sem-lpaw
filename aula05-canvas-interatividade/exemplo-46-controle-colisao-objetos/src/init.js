import Quad from "./geometries/Quad"
import redCirc from "./geometries/redCirc"
import { keyPress, key } from "./keyboard"

let CTX
let CANVAS
const FRAMES = 15

const quad = new Quad(0,45,30,5)
const rect = new Quad(130,130,50,0,'red')

const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	keyPress(CANVAS)
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.clearRect(0,0,CANVAS.width,CANVAS.height)
		
		quad.anda({
			width:CANVAS.width,
			height:CANVAS.height	
		},key)

		rect.draw(CTX)
		quad.draw(CTX)
		redCirc(CTX)

		quad.colide(rect) && console.error('QUAD COLIDE')

		requestAnimationFrame(loop)
	}, 1000/FRAMES)
}

export { init}