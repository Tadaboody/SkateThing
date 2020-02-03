import { Node } from '../Core/Node.js';
import { Vector2 } from '../Utilities.js';

class Sprite extends Node {
	constructor(spritesheet, spriteSize, drawSize, ...args) {
		super(...args);
		this.setSpritesheet(spritesheet, spriteSize);
		this.drawSize = drawSize || this.spriteSize;

		this._spriteIndex = 0;
	}

	render(ctx) {
		ctx.drawImage(this.spritesheet, 
					  (this.spriteSize.x * this.spriteIndex) % this.spritesheet.width, 
					  this.spriteSize.y * Math.floor(this.spriteIndex * this.spriteSize.x / this.spritesheet.width), 
					  this.spriteSize.x, 
					  this.spriteSize.y, 
					  -this.drawSize.x/2, 
					  -this.drawSize.y/2, 
					  this.drawSize.x, 
					  this.drawSize.y
		);
	}

	setSpritesheet(spritesheet, spriteSize) {
		this.spritesheet = spritesheet;
		this.spriteSize = spriteSize || new Vector2(spritesheet.width, spritesheet.height);
  }
  
  set spriteIndex(value) {
    this._spriteIndex = Math.floor(value);
  }

  get spriteIndex() {
    return this._spriteIndex;
  }
}

export { Sprite };
export default Sprite;