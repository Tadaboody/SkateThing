import { Node } from '../Core/Node.js';
import { Vector2 } from '../Utilities.js';

class Camera extends Node {
  constructor(...args) {
    super(...args);

    this.scale = new Vector2(1, 1);
  }

  setScale(scale) {
    this.scale = scale;
  }

  setActive() {
    this.engine.camera = this;
  }

  transform_context(ctx) {
    ctx.translate(
      -this.globalPosition.x * this.scale.x + this.engine.canvas.width / 2, 
      -this.globalPosition.y * this.scale.y + this.engine.canvas.height / 2
    );
    ctx.scale(this.scale.x, this.scale.y)
    ctx.rotate(-this.globalRotation);
  }
}

export { Camera };
export default Camera;