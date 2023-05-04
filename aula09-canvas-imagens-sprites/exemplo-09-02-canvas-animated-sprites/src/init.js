import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 6

let goblinImage = null
let bgImage = null
let bgPattern=null
let x = 0
let y = 0

let totalSpritesX = 3	//Total de sprites em X
let totalSpritesY = 4	//Total de sprites em Y
let cellWidth	//largura da celular de recorte
let cellHeight 	//altura da celula de recorte

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	goblinImage = await loadImage('img/goblin.png')
	bgImage = await loadImage('img/bg/dust.png')
	bgPattern = CTX.createPattern(bgImage,'repeat')

	cellWidth = goblinImage.naturalWidth / totalSpritesX + 3.5
	cellHeight = goblinImage.naturalHeight / totalSpritesY

	loop()
}


const loop = () => {
	setTimeout(() => {
		CTX.fillStyle = bgPattern;
		CTX.fillRect(0,0,CANVAS.width,CANVAS.height)

		x = x < totalSpritesX - 1 ? x + 1 : 0;
		//var = (Teste)?verdade:falso;

		CTX.drawImage(
			goblinImage,
			x * cellWidth,
			0 * cellHeight,
			cellWidth,
			cellHeight, //source
			200, 40, cellWidth, cellHeight //draw
		)

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }