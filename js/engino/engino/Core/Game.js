import { Engine } from "./Engine.js";

class Game {
    constructor(canvas) {
        if (canvas == undefined) {
            console.error("Got an undefined canvas")
        }
        this.canvas = canvas;

        this.engine = new Engine(canvas);
    }

    start(root) {
        this.engine.start(root);
    }
}

export { Game };
export default { Game };
