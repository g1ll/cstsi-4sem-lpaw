export default print=(ctx,string)=>{
	console.log(ctx)
	let textSize = 42;
	ctx.font = `bold ${textSize}px _sans`;
	ctx.textBaseline = "top";
	let textMetric = ctx.measureText(string)
	console.log(textMetric);
	ctx.fillStyle = "#000";
	ctx.fillText(string,
		ctx.canvas.width / 2 - textMetric.width / 2,
		ctx.canvas.height / 2 - textSize)
}