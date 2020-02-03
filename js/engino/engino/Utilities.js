class Vector2 {
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}

	add(other) {
		return new Vector2(this.x + other.x, this.y + other.y);
	}

	sub(other) {
		return new Vector2(this.x - other.x, this.y - other.y);
	}

	mul(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	div(scalar) {
		return new Vector2(this.x / scalar, this.y / scalar);
	}

	dot(other) {
		return this.x * other.x + this.y * other.y;
  }

  distance(other) {
    return this.sub(other).size;
  }

  distanceSquard(other) {
    return this.sub(other).sizeSquard;
  }
  
  copy() {
    return new Vector2(this.x, this.y);
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

	get size() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
  }

	get sizeSquard() {
		return this.x*this.x + this.y*this.y;
  }
  
  get normalized() {
    return this.size > 0 ? this.div(this.size) : this;
  }
}

class Matrix2x2 {
	constructor(r1c1=0, r2c1=0, r1c2=0,r2c2=0) {
		this.r1c1 = r1c1;
		this.r2c1 = r2c1;
		this.r1c2 = r1c2;
		this.r2c2 = r2c2;
	}

	apply(vector) {
		return new Vector2(this.r1c1 * vector.x + this.r1c2 * vector.y, 
						  this.r2c1 * vector.x + this.r2c2 * vector.y);
	}

	static rotate(angle) {
		let cosAngle = Math.cos(angle);
		let sinAngle = Math.sin(angle);
		return new Matrix2x2(cosAngle, 
							 sinAngle, 
							 -sinAngle, 
							 cosAngle);
	}
}

const easingFunction = {
    linear: (t) => { return t; },
    quadIn: (t) => { return t * t; },
    quadOut: (t) => { return -Math.pow(t - 1, 2) + 1; },
    quadInOut: (t) => { return 0.5 * (t < 0.5 ? easingFunction.quadIn(t * 2) : easingFunction.quadOut(t * 2)) }
}

class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    if (this.last === null) {
      this.first = new Node(data);
      this.last = this.first;
    } else {
      this.last.next = new Node(data);
    }
  }

  dequeue() {
    if (this.last === null)
      return null;
    
    const data = this.first.data;
    this.first = this.first.next;
    if (this.first === null)
      this.last = null;

    return data;
  }

  isEmpty() {
    return this.first === null;
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export { Vector2, Matrix2x2, easingFunction, Queue, clamp };