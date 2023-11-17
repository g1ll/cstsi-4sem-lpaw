import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 30

let goblinImage = null
let bgImage = null
let bgPattern = null
let x = 0
let y = 0

let gameover = false

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
		console.log({cellWidth,cellHeight})
		loop()
	} catch (e) {
		console.error("Assets Error: ${e.message}");
	}
}


const loop = () => {
	setTimeout(() => {
		CTX.fillStyle = bgPattern;
		CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)

		x = x < totalSpritesX - 1 && !gameover ? x + 1 : 0;
		//var = (Teste)?verdade:falso;
		
		// if(x < totalSpritesX - 1)
		// 	x+=1
		// else x = 0

		// x+=1
		// if(x > totalSpritesX - 1) x = 0
	
		CTX.drawImage(
			goblinImage,
			x * cellWidth,
			3 * cellHeight,
			cellWidth,
			cellHeight, //source
			100, 100, cellWidth/2, cellHeight/2 //draw
		)

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}


window.addEventListener('keydown',(e)=>{
	gameover = e.key=='Enter'
	console.log(e.key)
	console.error('GAMEOVER')
})

export { init }