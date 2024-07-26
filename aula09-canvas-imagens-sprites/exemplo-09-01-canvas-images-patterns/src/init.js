import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 15//30//60//120

let goblinImage = null
let backgroundImage = null
let pattern = null

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	
	console.log("carregando imagem...")
	
	// backgroundImage = await ((url)=>new Promise(resolve=>{
	// 	const img = new Image();
	// 	img.src = url;
	// 	img.addEventListener("load",()=>resolve(img));
	// }))('img/bg/rock-grass-1.jpg');

	backgroundImage = await loadImage('img/bg/patterns/red-rock-01-small.jpg')

	console.log(backgroundImage)

	// pattern = CTX.createPattern(backgroundImage,'repeat')
	
	goblinImage = await loadImage('img/goblin.png')

	// console.log([goblinImage,backgroundImage])
	
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.drawImage(backgroundImage,0,0,CANVAS.width,CANVAS.height)
		
		// CTX.fillStyle = pattern;
		// CTX.fillRect(0,0,CANVAS.width,CANVAS.height)

		CTX.drawImage( //Desenha toda a imagem no tamanho 165x200
			goblinImage,
			// 0,0,82.5,100,
			0,0,160,200,
		)

		// Denha parte da imagem, 
		// recortando uma célula de 165*174
		CTX.drawImage(
			goblinImage, //Objeto Image
			2*165,3*177,165,174, //source
			200,100,165,174 //draw (destination)
		)

		requestAnimationFrame(loop)
	},1000/FRAMES)
}

// 1*goblinImage.naturalWidth/3,0,165,174, //source
export { init}