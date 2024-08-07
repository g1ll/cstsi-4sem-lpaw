import { keyPress, key } from "./keyboard"
import writeCenterXY from "./text"

let CTX
let CANVAS
const FRAMES = 15

const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	keyPress(CANVAS)
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)

		writeCenterXY(CTX,
			CANVAS.width,
			CANVAS.height,
			`Apertou: ${key}`,
			'blue',30, 'sans','bold','top')

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init, FRAMES, CANVAS }