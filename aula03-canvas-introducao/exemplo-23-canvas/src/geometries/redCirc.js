export default redCirc = (ctx) => {
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.arc(35, 35, 20, 0, Math.PI / 180 * 360)
	ctx.fillStyle = 'red';
	ctx.strokeStyle = '#00f';
	ctx.fill();
	ctx.stroke();
}