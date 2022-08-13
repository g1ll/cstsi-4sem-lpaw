import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 60

let goblinImage = null
let x = 0
let y = 0

let cellWidth = 165		//largura da celular de recorte
let cellHeight = 177	//altura da celula de recorte
let totalSprites = 3		//Total de sprites
let spriteSpeed = 1		//Velocidade de troca de sprites (anime)

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	goblinImage = await loadImage('img/goblin.png')
	loop()
	animeSprite()
}

const animeSprite = ()=>{ //Controla a animacao do sprite
	setInterval(() => {
		x = x < totalSprites - 1 ? x + 1 : 0;
	}, 1000 / (FRAMES*spriteSpeed/10))
}

const loop = () => {

	setTimeout(() => {
		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)

		CTX.drawImage(
			goblinImage,
			x * cellWidth,
			y,
			cellWidth,
			cellHeight, //source
			100, 10, 165, 174 //draw
		)

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }


