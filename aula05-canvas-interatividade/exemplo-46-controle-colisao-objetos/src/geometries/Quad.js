export default class Quad {
	constructor(x, y, size, speed = 10, color = "#00f") {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.color = color;
		this.status = 'ArrowRight';
	}

	draw(ctx) {
		ctx.lineWidth = 5;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	};

	anda(limits, key) {

		switch (key) {
			case 's':
				this.status = 'down'
				break
		}

		switch (this.status) {
			case 'down':
				this.y += this.speed
				break
			case 'right':
				this.x += this.speed
				break;
		}

		if(this.x > limits.width)
			this.x = -this.size
		else if(this.x + this.size < 0)
			this.x = limits.width - this.size		
	}

	colide(rect) {
		return (
			Math.abs(
				this.x + this.size / 2 
				- (rect.x + rect.size / 2)
			) 
			< (this.size+rect.size)/2
			&& 
			Math.abs(this.y + this.size / 2 
			- (rect.y + rect.size / 2))
			< this.size/2+rect.size/2
			)
	}

	move(limits, key) {

		let movements = {
			'ArrowDown': { x: this.x, y: this.y + this.speed },
			'ArrowRight': { x: this.x + this.speed, y: this.y }
		}

		this.status = movements[key] ? key : this.status

		this.x = movements[this.status].x
		this.y = movements[this.status].y

		this.x = this.x + this.size > limits.width ? -this.size : this.x
		this.x = this.x + this.size < 0 ? limits.width - this.size : this.x
	};
}