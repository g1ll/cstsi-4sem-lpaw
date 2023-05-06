import Circle from './geometries/Circle';

export default class Smile extends Circle {

	constructor(x, y, size, speed = 10, color = "#00f") {
		super(x, y, size, speed, color)
		this.status = 'ArrowDown';
	}


	paint(ctx) {
		// ctx.fillStyle = "#fff";
		this.draw(ctx)
		this.circ(ctx,
			this.x - this.size / 2.5,
			this.y - this.size / 4,
			this.size * .1, 1, 'black', 'black')

		this.circ(ctx,
			this.x + this.size / 2.5,
			this.y - this.size / 4,
			this.size * .1, 1, 'black', 'black')

		ctx.beginPath()
		ctx.lineWidth = 2
		ctx.arc(this.x, this.y + this.size / 4, this.size / 2, 0, Math.PI)
		ctx.strokeStyle = "#000"
		ctx.stroke()

		ctx.beginPath()
		ctx.lineWidth = 2
		ctx.arc(this.x, this.y, this.size, 0, Math.PI*2)
		ctx.stroke()
		
	}

	limits(limits){
		this.x = this.x + this.size > limits.width ? limits.width-this.size : this.x
		this.x = this.x -this.size < 0 ? this.size : this.x

		this.y = this.y + this.size > limits.height ? limits.height-this.size : this.y
		this.y = this.y - this.size < 0 ? this.size : this.y
	}
}