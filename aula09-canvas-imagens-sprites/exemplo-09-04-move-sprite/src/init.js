import { keyDownUp,hasKey } from "./keyboard"
import { loadImage } from "./loaderAssets"


let CTX
let CANVAS
const FRAMES = 60

let goblinImage = null
let bgImage = null
let bgPattern=null
let x = 0
let y = 0

let cellWidth = 165		//largura da celular de recorte
let cellHeight = 177	//altura da celula de recorte
let totalSprites = 3	//Total de sprites
let goblinSpeed =  2 	//Velocidade de troca de sprites (anime)
let goblinPositionX = 0
let goblinPositionY = 0
let goblinVelocity = 5

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	goblinImage = await loadImage('img/goblin.png')
	bgImage =  await loadImage('img/rock-grass-1-small.jpg')
	bgPattern = CTX.createPattern(bgImage,'repeat')
	keyDownUp(CANVAS)
	loop()
	animeSprite(goblinSpeed)

}

const animeSprite = (spriteSpeed)=>{ //Controla a animacao do sprite
	setInterval(() => {
		x = x < totalSprites - 1 ? x + 1 : 0;
	}, 1000 / (FRAMES*spriteSpeed/10))
}

const loop = () => {

	setTimeout(() => {

		
		if(hasKey('ArrowDown'))
			goblinPositionY = goblinPositionY + goblinVelocity
		
		if(hasKey('ArrowRight'))
			goblinPositionX = goblinPositionX + goblinVelocity



		CTX.fillStyle = bgPattern;
		CTX.fillRect(0,0,CANVAS.width,CANVAS.height)

		CTX.drawImage(
			goblinImage,
			x * cellWidth,//posicao X de recorte
			y, //posicao Y de recorte
			cellWidth, //largura celula recorte
			cellHeight, //altura celula recorte
			goblinPositionX, //posicao X de desenho
			goblinPositionY, //posicao X de desenho
			165, 174 //draw
		)

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }


