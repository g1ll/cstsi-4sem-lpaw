import Enemy from "./Enemy"
import Smile from "./Smile"
import { keyPress, key } from "./keyboard"

let CTX
let CANVAS
const FRAMES = 15

const qtdEnemies = 5

let enemies = Array.from({length:qtdEnemies});

const smile = new Smile(300, 100, 20, 10)

let gameover = false
let animeReqReference;
let boundaries

const loop = () => {
	setTimeout(() => {

		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
		//input
		smile.move(boundaries, key)//update
		smile.paint(CTX)//draw

		enemies.forEach(e =>{
			e.move(boundaries, 0) 
			e.draw(CTX)
			 //var = teste?verdadeiro:falso;
			 gameover = !gameover 
			 		? e.colide(smile)
					: true;
		})

		if (gameover) {
			console.error('DEAD!!!')
			cancelAnimationFrame(animeReqReference)
		} else	animeReqReference = requestAnimationFrame(loop)

	}, 1000 / FRAMES)
}

// export default function init(){
// function init(){
const init = ()=>{
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	
	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	enemies = enemies.map(i=>new Enemy(
			Math.random()*CANVAS.width,
			Math.random()*CANVAS.height,
			10, 25, 'red'
		))
	
	keyPress(window)
	loop()
}


export { init, loop }
