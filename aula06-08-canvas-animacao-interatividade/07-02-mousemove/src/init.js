import circle from "./circle"
import { getClick, getHover, mouseClick, mouseMove } from "./mouse"


let CTX
let CANVAS
const FRAMES = 15


const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	mouseMove(CANVAS)
	mouseClick(CANVAS)
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.fillStyle = 'rgba(255,255,255,0.3)'
		CTX.fillRect(0, 0,
			CANVAS.width, CANVAS.height)

		let canvasRect = CANVAS.getBoundingClientRect()
		let hover = {
			x: getHover().x - canvasRect.x,
			y: getHover().y - canvasRect.y,
		}
		circle(CTX, hover.x, hover.y)
		console.log(getClick().x);
		circle(CTX,
			getClick().x - canvasRect.x,
			getClick().y - canvasRect.y,
			'red'
		)

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }