import { Node } from '../Core/Node.js';
import { easingFunction as ef, Vector2 } from '../Utilities.js';

class Animation extends Node {
	constructor(animatedProperty, startValue, endValue, duration, repeats=1, easingFunction=ef.linear, alternate=false, ...args) {
		super(...args);
		this.animatedProperty = animatedProperty;
		this.startValue = startValue;
		this.endValue = endValue;
		this.duration = duration;
		this.easingFunction = easingFunction;
		this.repeats = repeats;
		this.alternate = alternate;

		this.started = false;
		this.surpassed = 0;
		this.currentRepeats = 0;
	}

	update(deltatime) {
		if (this.started) {
			this.surpassed = this.surpassed + deltatime;
			while (this.surpassed >= this.duration) {
				this.surpassed -= this.duration;
				this.currentRepeats++;
			}

			let timePercentage = this.surpassed / this.duration;
			if (this.alternate && (this.currentRepeats % 2 == 1))
				timePercentage = 1 - timePercentage;

			if (this.currentRepeats >= this.repeats && this.repeats > 0) {
				this.stop();
			}

      let value;
      if (typeof this.parent[this.animatedProperty] === 'number')
        value = this.startValue + (this.endValue + 1 - this.startValue) * this.easingFunction(timePercentage);
      else
        value = this.startValue.add(this.endValue.add(new Vector2(1, 1)).sub(this.startValue).mul(this.easingFunction(timePercentage)));

			this.parent[this.animatedProperty] = value;
		}
	}

	start() {
		this.started = true;
		this.reset();
	}

	stop() {
		this.started = false;
		this.reset();
	}

	pause() {
		this.started = false;
	}

	resume() {
		this.started = true;
	}

	reset() {
    this.surpassed = 0;
    this.currentRepeats = 0;
	}
}

export { Animation };
export default Animation;