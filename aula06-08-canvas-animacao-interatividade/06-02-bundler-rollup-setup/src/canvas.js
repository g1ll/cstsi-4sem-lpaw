import print from "./print";

export default startCanvas = () => {
	const canvas = document.querySelector('canvas')
	console.log(canvas);
	print(
		canvas.getContext('2d'),
		"Ola Canvas!"
	)
}