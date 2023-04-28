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
	console.log(goblinImage)
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.clearRect(0,0,CANVAS.width,CANVAS.height)
		
		CTX.drawImage( //Desenha toda a imagem no tamanho 165x200
			goblinImage,
			0,0,165,200,
		)

		//Denha parte da imagem, 
		//recortando uma célula de 165*174
		CTX.drawImage(
			goblinImage,
			2*165,0,165,174, //source
			200,10,165,174 //draw (destination)
		)

		requestAnimationFrame(loop)
	}, 1000/FRAMES)
}

// 1*goblinImage.naturalWidth/3,0,165,174, //source
export { init}