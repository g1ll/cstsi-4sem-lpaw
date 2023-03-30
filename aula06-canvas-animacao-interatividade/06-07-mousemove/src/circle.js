const circle = (ctx,x,y) => {
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.arc(x, y, 20, 0, Math.PI * 2)
	ctx.fillStyle = '#00f';
	ctx.strokeStyle = ctx.fillStyle
	ctx.fill();
	ctx.stroke();
}

export default circle