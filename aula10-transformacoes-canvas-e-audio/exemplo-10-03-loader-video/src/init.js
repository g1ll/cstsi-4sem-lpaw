import { loadAudio, loadImage, loadVideo } from "./loaderAssets"
import { keyPress, key } from "./keyboard"

let CTX
let CANVAS
const FRAMES = 60

let goblinImage
let x = 0
let y = 0

let cellWidth = 165		//largura da celular de recorte
let cellHeight = 177	//altura da celula de recorte
let totalSprites = 3	//Total de sprites
let spriteSpeed = 1	//Velocidade de troca de sprites (anime)

let sound
let theme
let video
let progress = {
	count: 0,
	percent:0,
	total: 2,
}

let loadProgress=setInterval(() => {
	progress.percent = progress.count / progress.total *100
	progress.percent = Math.floor(progress.percent)
	console.log(
		progress,
		progress.percent + '%'
	)
	if(progress.percent >= 100) 
		clearInterval(loadProgress)
}, 100);

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	goblinImage = await loadImage('img/goblin.png', progress)
	sound = await loadAudio('sounds/retrogame.ogg')
	sound.volume = .5
	theme = await loadAudio('sounds/illusory.mp3', progress)
	theme.volume = .3
	theme.loop = true
	video = await loadVideo('video/exemplos_atividade-03.mp4',progress)
	video.volume = 0
	keyPress(CANVAS)
	CANVAS.onclick = () => video && video.play()
	loop()
	animeSprite()
}

const animeSprite = () => { //Controla a animacao do sprite
	setInterval(() => {
		x = x < totalSprites - 1 ? x + 1 : 0;
	}, 1000 / (FRAMES * spriteSpeed / 10))
}

const loop = () => {
	setTimeout(() => {
		if (video.paused)
			CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
		else
			CTX.drawImage(video, 0, 0, CANVAS.width, CANVAS.height);

		CTX.drawImage(
			goblinImage,
			x * cellWidth,
			y,
			cellWidth,
			cellHeight, //source
			200, 50, 165, 174 //draw
		)

		key == 'ArrowUp' && sound.play();
		key == 'Enter' && theme.currentTime == 0 && theme.play()

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }