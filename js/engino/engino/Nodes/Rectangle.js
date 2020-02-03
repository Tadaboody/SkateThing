import { Node } from '../Core/Node.js';

class Rectangle extends Node {
	constructor(size, color, ...args) {
		super(...args);
		this.size = size;
		this.color = color;
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(-this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
	}
}

export { Rectangle };
export default Rectangle;