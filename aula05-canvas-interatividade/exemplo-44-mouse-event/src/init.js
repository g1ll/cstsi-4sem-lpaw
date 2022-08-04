import { getClick, mouseClick } from "./mouse"
import writeCenterXY from "./text"

let CTX
let CANVAS
const FRAMES = 15


const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	mouseClick(CANVAS)
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
		
		let canvasRect = CANVAS.getBoundingClientRect()
		let clk = {
				x:getClick().x-canvasRect.x,
				y:getClick().y-canvasRect.y,
		}
		let msg = `Clicou em x:${clk.x}, y:${clk.y}`
		writeCenterXY(CTX,CANVAS.width,	CANVAS.height,msg,
						'blue',30, 'sans','bold','top')
		
		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }