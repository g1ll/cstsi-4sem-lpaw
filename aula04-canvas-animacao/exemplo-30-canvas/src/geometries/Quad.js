export default class Quad {
	constructor(x, y, size, speed = 10, color="#00f") {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.color = color;

		this.draw = (ctx) => {
			ctx.lineWidth = 5;
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.size, this.size);
		};

		this.move = (limits) => {
			if (this.x + this.size + this.speed < limits.width)
				this.x += this.speed;
			else
				// this.x = limits.width - this.size;
				this.x = 0;
		};
	}
}