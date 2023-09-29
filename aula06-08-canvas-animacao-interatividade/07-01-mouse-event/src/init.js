import {
	getMousePosition,
	mouseClick,
	mouseMoving 
} from "./mouse"
import writeCenterXY from "./text"

let CTX
let CANVAS
const FRAMES = 15


const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	console.log(CANVAS.getBoundingClientRect())
	CTX = CANVAS.getContext('2d')
	mouseClick(CANVAS)
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
		
		let {x,y} = CANVAS.getBoundingClientRect()
		
		let position = {
				x:getMousePosition().x-Math.round(x),
				y:getMousePosition().y-Math.round(y),
		}
		let msg = `Clique em x:${position.x}, y:${position.y}`
		writeCenterXY(CTX,CANVAS.width,	CANVAS.height,msg,
						'red',30, 'serif','bold','top')
		
		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export default init