import { loadImage } from "./loaderAssets"

let CTX
let CANVAS
const FRAMES = 15

let goblinImage = null
let backgroundImage = null
<<<<<<< HEAD
=======
let pattern = null
>>>>>>> aula-09-atualizacao-exemplos

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	
<<<<<<< HEAD
	backgroundImage = await ((url)=>new Promise(resolve=>{
		const img = new Image();
		img.src = url;
		img.addEventListener("load",()=>resolve(img));
	}))('img/bg/rock-grass-3.jpg');
	
	// backgroundImage = await loadImage('img/bg/patterns/rock-grass-3-small.jpg')
=======
	// backgroundImage = await ((url)=>new Promise(resolve=>{
	// 	const img = new Image();
	// 	img.src = url;
	// 	img.addEventListener("load",()=>resolve(img));
	// }))('img/bg/rock-grass-1.jpg');
	
	backgroundImage = await loadImage('img/bg/patterns/dunnes-small.jpg')
	pattern = CTX.createPattern(backgroundImage,'repeat')
	
>>>>>>> aula-09-atualizacao-exemplos
	goblinImage = await loadImage('img/goblin.png')

	// console.log([goblinImage,backgroundImage])
	loop()
}

const loop = () => {
	setTimeout(() => {
<<<<<<< HEAD
		CTX.drawImage(backgroundImage,0,0,CANVAS.width,CANVAS.height)
		
		// let pattern = CTX.createPattern(backgroundImage,'repeat')
		// CTX.fillStyle = pattern;
		// CTX.fillRect(0,0,CANVAS.width,CANVAS.height)
=======
		// CTX.drawImage(backgroundImage,0,0,CANVAS.width,CANVAS.height)
		
		CTX.fillStyle = pattern;
		CTX.fillRect(0,0,CANVAS.width,CANVAS.height)
>>>>>>> aula-09-atualizacao-exemplos

		// CTX.drawImage( //Desenha toda a imagem no tamanho 165x200
		// 	goblinImage,
		// 	200,30,165,200,
		// )

		// Denha parte da imagem, 
		// recortando uma célula de 165*174
<<<<<<< HEAD
		// CTX.drawImage(
		// 	goblinImage,
		// 	2*165,0,165,174, //source
		// 	200,10,165/2,174/2 //draw (destination)
		// )
=======
		CTX.drawImage(
			goblinImage,
			2*165,3*174,165,174, //source
			200,10,165/2,174/2 //draw (destination)
		)
>>>>>>> aula-09-atualizacao-exemplos

		requestAnimationFrame(loop)
	}, 1000/FRAMES)
}

// 1*goblinImage.naturalWidth/3,0,165,174, //source
export { init}