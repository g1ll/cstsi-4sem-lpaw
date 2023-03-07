import circle from "./circle"
import { getClick, mouseClick, mouseMove } from "./mouse"


let CTX
let CANVAS
const FRAMES = 15


const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	mouseMove(CANVAS)
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.fillStyle = 'rgba(255,255,255,0.3)'
		CTX.fillRect(0, 0,
			 CANVAS.width, CANVAS.height)
		
		let canvasRect = CANVAS.getBoundingClientRect()
		let clk = {
				x:getClick().x-canvasRect.x,
				y:getClick().y-canvasRect.y,
		}
		circle(CTX,clk.x,clk.y)
		
		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }