import Circle from "./geometries/Cricle";

export default class Enemy extends Circle{
	constructor(x, y, size, speed = 10, color = "#00f") {
		super()
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.color = color;
		this.status = null;
		this.line = 3
		console.log(this)
	}

	move(limits){
		this.y +=this.speed
		this.limits(limits)
	}

	limits(limits){

		if(this.y - this.size > limits.height ){
			this.y = -this.size
			this.x = Math.random()*limits.width;
		}
	}
}







