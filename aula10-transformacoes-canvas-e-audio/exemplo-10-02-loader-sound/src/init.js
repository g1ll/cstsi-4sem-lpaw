import { loadAudio, loadImage } from "./loaderAssets"
import { keyPress, key, keyDown, hasKey } from "./keyboard"

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

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	goblinImage = await loadImage('img/goblin.png')

	try {
		sound = await loadAudio('sounds/retrogame.ogg')
		sound.volume = .5
	} catch (error) {
		console.log(sound)
		sound = null
		console.error(error)
	}

	try {
		theme = await loadAudio('sounds/illusory.mp3')
		theme.volume = .3
		theme.loop = true
	} catch (error) {
		console.error(error)
	}

	keyDown(CANVAS)
	keyPress(CANVAS)
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
		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)

		CTX.drawImage(
			goblinImage,
			x * cellWidth,
			y,
			cellWidth,
			cellHeight, //source
			200, 50, 165, 174 //draw
		)

		key == 'ArrowUp' && sound && sound.play();
		key == 'Enter' && theme.paused && theme.play()

		if (hasKey('r')) {
			theme.currentTime = 0
		}

		if (hasKey('p')) {
			if (theme.paused) {
				theme.play()
			} else {
				theme.pause()
			}
		}

		requestAnimationFrame(loop)
	}, 1000 / FRAMES)
}

export { init }