import { Node } from '../Core/Node.js';

class Circle extends Node {
	constructor(radius, color, ...args) {
		super(...args);
		this.radius = radius;
		this.color = color;
	}

	render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      0, 
      0, 
      this.radius, 
      0, 
      2 * Math.PI, 
    );
    ctx.fill();
	}
}

export { Circle };
export default Circle;