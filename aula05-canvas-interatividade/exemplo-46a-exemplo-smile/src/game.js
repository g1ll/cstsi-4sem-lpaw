import Enemy from "./Enemy"
import Smile from "./Smile"
import { keyPress, key } from "./keyboard"

let CTX
let CANVAS
const FRAMES = 30

let boundaries

const qtdEnemies = 10
let enemies = Array.from(
	(new Array(qtdEnemies)).keys());

const smile = new Smile(300, 100, 20, 5, 'yellow')

let anime;

const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	enemies = enemies.map(i => new Enemy(
		Math.random() * CANVAS.width,
		Math.random() * CANVAS.height, 10, 5, 'red')
	)
	
	keyPress(window)
	loop()
}

const loop = () => {
	setTimeout(() => {

		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)

		smile.move(boundaries, key)
		smile.paint(CTX)

		enemies.forEach(e => e.draw(CTX))
		enemies.forEach(e => e.move(boundaries, 0))

		if (enemies.find(e => e.colide(smile))) {
			console.error('DEAD!!!')
			cancelAnimationFrame(anime)
			return 0;
		} 
		
		anime = requestAnimationFrame(loop)

	}, 1000 / FRAMES)
}

export { init }