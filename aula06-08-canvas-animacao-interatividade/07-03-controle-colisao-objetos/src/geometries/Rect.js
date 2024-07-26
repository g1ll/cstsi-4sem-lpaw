import Quad from "./Quad";

export default class Rect extends Quad{

	constructor(x, y, size, speed = 10, color = "#00f") {
		super(x, y, size, speed, color)
		this.sizew = this.size*2;
	}

	draw(ctx){
		ctx.lineWidth = 5;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.sizew, this.size);
	}
}