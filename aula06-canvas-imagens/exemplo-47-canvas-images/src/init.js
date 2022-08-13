import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 15

let goblinImage = null

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	goblinImage = await loadImage('img/goblin.png')
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.clearRect(0,0,CANVAS.width,CANVAS.height)
		
		CTX.drawImage( //Desenha toda a imagem no tamanho 165x200
			goblinImage,
			0,0,165,200,
		)

		CTX.drawImage(//Denha parte da imagem, recortando uma célula de 165*174
			goblinImage,
			0,0,165,174, //source
			200,10,165,174 //draw
		)

		requestAnimationFrame(loop)
	}, 1000/FRAMES)
}

export { init}