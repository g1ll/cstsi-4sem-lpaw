import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 6

let goblinImage = null
let bgImage = null
let bgPattern = null
let x = 0
let y = 0

let totalSpritesX = 3	//Total de sprites em X
let totalSpritesY = 4	//Total de sprites em Y
let cellWidth	//largura da celular de recorte
let cellHeight 	//altura da celula de recorte
//async/await
//loadImage().then(()=>{resolvido}).catch(rejeitado)
//
const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	//goblin sprites png
	try {
		goblinImage = await loadImage('img/goblin.png')

		//bg pattern
		bgImage = await loadImage('img/bg/dust.png')
		
		bgPattern = CTX.createPattern(bgImage, 'repeat')
		
		cellWidth = goblinImage.naturalWidth / totalSpritesX + 3.5
		cellHeight = goblinImage.naturalHeight / totalSpritesY

		loop()
	} catch (e) {
		console.error("Assets Error: ${e.message}");
	}
}


const loop = () => {
	setTimeout(() => {
		CTX.fillStyle = bgPattern;
		CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)

		x = x < totalSpritesX - 1 ? x + 1 : 0;
		//var = (Teste)?verdade:falso;

		CTX.drawImage(
			goblinImage,
			x * cellWidth,
			0 * cellHeight,
			cellWidth,
			cellHeight, //source
			200, 40, cellWidth*2, cellHeight*2 //draw
		)

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }