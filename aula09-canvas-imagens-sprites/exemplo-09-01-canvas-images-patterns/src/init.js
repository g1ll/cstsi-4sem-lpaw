import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 15

let goblinImage = null
let backgroundImage = null

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	
	backgroundImage = await ((url)=>new Promise(resolve=>{
		const img = new Image();
		img.src = url;
		img.addEventListener("load",()=>resolve(img));
	}))('img/bg/rock-grass-3.jpg');
	
	// backgroundImage = await loadImage('img/bg/patterns/rock-grass-3-small.jpg')
	goblinImage = await loadImage('img/goblin.png')

	// console.log([goblinImage,backgroundImage])
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.drawImage(backgroundImage,0,0,CANVAS.width,CANVAS.height)
		
		// let pattern = CTX.createPattern(backgroundImage,'repeat')
		// CTX.fillStyle = pattern;
		// CTX.fillRect(0,0,CANVAS.width,CANVAS.height)

		// CTX.drawImage( //Desenha toda a imagem no tamanho 165x200
		// 	goblinImage,
		// 	200,30,165,200,
		// )

		// Denha parte da imagem, 
		// recortando uma célula de 165*174
		// CTX.drawImage(
		// 	goblinImage,
		// 	2*165,0,165,174, //source
		// 	200,10,165/2,174/2 //draw (destination)
		// )

		requestAnimationFrame(loop)
	}, 1000/FRAMES)
}

// 1*goblinImage.naturalWidth/3,0,165,174, //source
export { init}