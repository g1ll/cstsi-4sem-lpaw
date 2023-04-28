import { getKeys, keyDownUp } from "./keyboard"
import writeCenterXY from "./text"

let CTX
let CANVAS
const FRAMES = 15
const FRAME_INTERVAL = 1000/FRAMES

const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	keyDownUp(CANVAS)
	loop()
}

const loop = () => {
	setTimeout(callback, FRAME_INTERVAL)
}

const callback = () => {
	CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
	// CTX.fillStyle = 'rgba(255,255,255,.05)'
	// CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)
	let key='';
	getKeys().forEach(k=>key+=' '+k)
	console.log(key)
	writeCenterXY(CTX,CANVAS.width,	CANVAS.height,
		`Apertou: ${key}`,'red',30, 'sans','bold','top')

	requestAnimationFrame(loop)
}

export { init, loop }