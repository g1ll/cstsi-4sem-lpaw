export default redCirc = (ctx) => {
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.arc(50, 50, 20, 0, Math.PI / 180 * 360)
	ctx.fillStyle = 'rgba(255,0,0,.5)';
	ctx.strokeStyle = '#00f';
	ctx.fill();
	ctx.stroke();
}