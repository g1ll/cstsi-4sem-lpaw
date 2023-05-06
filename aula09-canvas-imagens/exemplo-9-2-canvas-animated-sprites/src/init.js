import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 6

let goblinImage = null
let bgImage = null
<<<<<<< HEAD:aula09-canvas-imagens-sprites/exemplo-09-02-canvas-animated-sprites/src/init.js
let bgPattern=null
=======
let bgPattern = null
>>>>>>> aula-09-atualizacao-exemplos:aula09-canvas-imagens/exemplo-9-2-canvas-animated-sprites/src/init.js
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
<<<<<<< HEAD:aula09-canvas-imagens-sprites/exemplo-09-02-canvas-animated-sprites/src/init.js
	goblinImage = await loadImage('img/goblin.png')
	bgImage = await loadImage('img/bg/dust.png')
	bgPattern = CTX.createPattern(bgImage,'repeat')

	cellWidth = goblinImage.naturalWidth / totalSpritesX + 3.5
	cellHeight = goblinImage.naturalHeight / totalSpritesY

	loop()
=======
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
>>>>>>> aula-09-atualizacao-exemplos:aula09-canvas-imagens/exemplo-9-2-canvas-animated-sprites/src/init.js
}


const loop = () => {
	setTimeout(() => {
		CTX.fillStyle = bgPattern;
<<<<<<< HEAD:aula09-canvas-imagens-sprites/exemplo-09-02-canvas-animated-sprites/src/init.js
		CTX.fillRect(0,0,CANVAS.width,CANVAS.height)
=======
		CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)
>>>>>>> aula-09-atualizacao-exemplos:aula09-canvas-imagens/exemplo-9-2-canvas-animated-sprites/src/init.js

		x = x < totalSpritesX - 1 ? x + 1 : 0;
		//var = (Teste)?verdade:falso;

		CTX.drawImage(
			goblinImage,
			x * cellWidth,
			0 * cellHeight,
			cellWidth,
			cellHeight, //source
<<<<<<< HEAD:aula09-canvas-imagens-sprites/exemplo-09-02-canvas-animated-sprites/src/init.js
			200, 40, cellWidth, cellHeight //draw
=======
			200, 40, cellWidth*2, cellHeight*2 //draw
>>>>>>> aula-09-atualizacao-exemplos:aula09-canvas-imagens/exemplo-9-2-canvas-animated-sprites/src/init.js
		)

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }