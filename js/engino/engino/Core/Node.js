import { Vector2, Matrix2x2 } from "../Utilities.js";

class Node {
	constructor(position=new Vector2(0, 0), 
				rotation=0) 
	{
		this.position = position;
		this.rotation = rotation;

		this._children = [];
		this._parent = null;

    this._dead = false;
    this._isReady = false;
  }
  
  _ready() {
    this._isReady = true;
    for (let child of this.children)
      child._ready();
    this.ready();
  }

	_update(deltatime) {

    // Update children
		for (var i = this.children.length-1; i >= 0; i--) {
      this.children[i]._update(deltatime);

      // Remove dead children
			if (this.children[i].dead)
				this.children.splice(i, 1);
		}

		this.update(deltatime);
	}

	_render(ctx) {
		ctx.save()

		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(this.rotation);

		this.render(ctx);

		this.children.forEach((child) => {
			child._render(ctx);
		});

		ctx.restore();
	}

	_setParent(parent) {
		this._parent = parent;
	}

	addChild(child) {
		this.children.push(child);
    child._setParent(this);
    if (this._isReady)
      child._ready();
	}

	die() {
		this._dead = true;
	}

	get engine() {
    return this._engine || this.parent.engine;
  }

  get root() {
    return this.parent || this;
  }
  
  get inputManager() {
    return this.engine.inputManager;
  }

  get signalRouter() {
    return this.engine.signalRouter;
  }

  get globalPosition() {
    if (this.parent === null)
      return new Vector2(this.position.x, this.position.y);

    const rotationMat = Matrix2x2.rotate(this.parent.rotation);
    return this.parent.globalPosition.add(rotationMat.apply(this.position));
  }

  get globalRotation() {
    if (this.parent === null)
      return this.rotation;

    return (this.rotation + this.parent.globalRotation) % (2 * Math.PI);
  }

  get parent() {
    return this._parent;
  }
  
  get children() {
    return this._children;
  }

  ready() {}
	update(deltatime) {}
	render(ctx) {}
}

export { Node };
export default { Node };
