import { Engine } from "./Engine.js";

class Game {
	constructor(canvas) {
		this.canvas = canvas;

		this.engine = new Engine(canvas);
	}

	start(root) {
		this.engine.start(root);
	}
}

export { Game };
export default { Game };
