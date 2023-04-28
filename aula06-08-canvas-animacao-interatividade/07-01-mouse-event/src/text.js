export default function writeCenterXY(ctx, cwidth, cheight, text,
	color = 'black', size = 12, family = 'serif',
	style = 'normal', base = 'alphabetic', stroke = false)
{
	ctx.font = `${style} ${size}px ${family}`;
	ctx.textBaseline = base;
	let textMetric = ctx.measureText(text)
	ctx.fillStyle = color;
	if (stroke) ctx.strokeStyle = color;
	if (!stroke)
		ctx.fillText(text,
			cwidth / 2 - textMetric.width / 2,
			cheight / 2 - size)
	else
		ctx.strokeText(text,
			cwidth / 2 - textMetric.width / 2,
			cheight / 2 - size)
}