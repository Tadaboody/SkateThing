import { Logger } from '../Logger.js';
import { InputManager } from "./InputManager.js";
import { SignalRouter } from "./SignalRouter.js";

class Engine {
	constructor(canvas) {

		Logger.info('creating Engine object.');

		this._canvas = canvas;
		this._ctx = canvas.getContext('2d');

		this.resizeCanvas();
		window.onresize = this.resizeCanvas.bind(this);

    this._root = null;
    this.camera = null;
		this._started = false;
		this._lastRender = 0;

    this._signalRouter = new SignalRouter();
    this._inputManager = new InputManager(canvas, this._signalRouter);

		Logger.info('created Engine object.');
	}

	resizeCanvas() {
		Logger.info('resizing canvas.');

		const canvasContainer = this._canvas.parentElement;
		this._canvas.width = canvasContainer.clientWidth;
		this._canvas.height = canvasContainer.clientHeight;
	}

	loop(timestamp) {
		let deltatime = timestamp - this._lastRender;
		if (!this._lastRender)
			deltatime = 0;

		this.update(deltatime);
		this.render();

		this._lastRender = timestamp;

		window.requestAnimationFrame(this.loop.bind(this));
	}

	start(root) {
    root._engine = this;
    this._root = root;
    root._ready();
		this._lastRender = 0;

		if (!this._started) {
			window.requestAnimationFrame(this.loop.bind(this));
			this._started = true;
		}
	}

	update(deltatime) {
    this._signalRouter.distributeSignals();
		this._root._update(deltatime);
	}

	render() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    
    this._ctx.save();
   
    if (this.camera)
      this.camera.transform_context(this._ctx);
    this._root._render(this._ctx);

    this._ctx.restore();
  }

  get engine() {
    return this;
  }
  
  get inputManager() {
    return this._inputManager;
  }

  get signalRouter() {
    return this._signalRouter;
  }

  get canvas() {
    return this._canvas;
  }

  get root() {
    return this._root;
  }
}

export { Engine };
export default { Engine };
