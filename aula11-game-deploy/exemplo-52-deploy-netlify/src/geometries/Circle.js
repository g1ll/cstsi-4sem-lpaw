export default class Circle {
	constructor(x, y, size, speed = 10, color = "#00f") {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.color = color;
		this.status = 'ArrowRight';
		this.line = 3
	}

	draw(ctx) {
		this.circ(ctx,
			this.x,
			this.y,
			this.size,
			this.line,
			this.color,
			this.color)
	}

	circ(ctx, x, y, r, l, color, fill = false) {
		ctx.lineWidth = l;
		ctx.strokeStyle = color
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2);
		ctx.stroke();
		if (fill) {
			ctx.fillStyle = fill
			ctx.fill()
		}
	}

	move(limits, key) {

		let movements = {
			'ArrowDown': { x: this.x, y: this.y + this.speed },
			'ArrowUp': { x: this.x, y: this.y - this.speed },
			'ArrowLeft': { x: this.x - this.speed, y: this.y },
			'ArrowRight': { x: this.x + this.speed, y: this.y }
		}

		this.status = movements[key] ? key : this.status

		this.x = movements[this.status].x
		this.y = movements[this.status].y

		this.limits(limits)
	}

	limits(limits){
		this.x = this.x - this.size > limits.width ? -2*this.size : this.x
		this.x = this.x + this.size < -2*this.size ? limits.width : this.x

		this.y = this.y - this.size > limits.height + this.size ? -this.size : this.y
		this.y = this.y + 2*this.size < 0 ? limits.height + 2*this.size : this.y
	}

	anda(limits, key) {

		switch (key) {
			case 's':
				this.status = 'down'
				break
			case 'w':
				this.status = 'up'
				break
			case 'a':
				this.status = 'left'
				break
			case 'd':
				this.status = 'right'
				break
		}

		switch (this.status) {
			case 'down':
				this.y += this.speed
				break
			case 'up':
				this.y -= this.speed
				break
			case 'left':
				this.x -= this.speed
				break
			case 'right':
				this.x += this.speed
				break
		}

		if (this.x > limits.width)
			this.x = -this.size
		else if (this.x + this.size < 0)
			this.x = limits.width - this.size

		if (this.y > limits.height)
			this.y = -this.size
		else if (this.y + this.size < 0)
			this.y = limits.height - this.size
	}

	oldColide(circ) {
		return Math.abs(this.x-circ.x) < (this.size+circ.size)*0.9
			   && Math.abs(this.y-circ.y) < (this.size+circ.size)*0.9
	}

	colide(circ){
		return this.size+circ.size >= Math.sqrt((this.x - circ.x)**2 + (this.y -circ.y)**2) 
	}
}