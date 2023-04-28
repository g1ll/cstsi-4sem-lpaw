import circle from "./circle"
<<<<<<< HEAD:aula06-canvas-animacao-interatividade/06-07-mousemove/src/init.js
import { getMouse, mouseClick, mouseMove } from "./mouse"
=======
import { getClick, getHover, mouseClick, mouseMove } from "./mouse"
>>>>>>> aula-06-atualizacao-20231:aula06-08-canvas-animacao-interatividade/07-02-mousemove/src/init.js


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
<<<<<<< HEAD:aula06-canvas-animacao-interatividade/06-07-mousemove/src/init.js
		let mouse = getMouse()
		let clk = {
				x:mouse.x-canvasRect.x,
				y:mouse.y-canvasRect.y,
=======
		let hover = {
			x: getHover().x - canvasRect.x,
			y: getHover().y - canvasRect.y,
>>>>>>> aula-06-atualizacao-20231:aula06-08-canvas-animacao-interatividade/07-02-mousemove/src/init.js
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