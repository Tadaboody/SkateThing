import { Vector2 } from "../Utilities.js";
import Logger from "../Logger.js";

class InputEvent {
	constructor() {
		this.timestamp = Date.now();
	}
}

class MouseInputEvent extends InputEvent {
	constructor(position, button) {
		super();
		this.position = position;
		this.button = button;
	}
}

class MouseDownInputEvent extends MouseInputEvent {}

class MouseUpInputEvent extends MouseInputEvent {}

class MouseMoveInputEvent extends MouseInputEvent {}

class KeyDownInputEvent extends InputEvent {
	constructor(key) {
		super()
		this.key = key;
	}
}

class KeyUpInputEvent extends InputEvent {
	constructor(key) {
		super();
		this.key = key;
	}
}

class WheelEvent extends InputEvent {
  constructor(delta) {
    super();
    this.delta = delta;
  }
}

class InputManager {
	constructor(element, inputListener=null) {
		this.element = element;

		this._attachedKeys = new Set();
    this.downKeys = new Set();
    
    this._signalRouter = inputListener;

		this._keyDownListener = null;
		this._keyUpListener = null;

		this._mouseDownListener = null;
		this._mouseUpListener = null;

		this._mousePosition = new Vector2(0, 0);

		window.addEventListener('keydown', 
			(event) => {this._keyDownEvent(event);});
		window.addEventListener('keyup', 
			(event) => {this._keyUpEvent(event);});

		window.addEventListener('mousedown', 
			(event) => {this._mouseDownEvent(event);});
		window.addEventListener('mouseup', 
			(event) => {this._mouseUpEvent(event);});
		window.addEventListener('mousemove', 
      (event) => {this._mouseMoveEvent(event);});
    window.addEventListener('wheel', 
      (event) => {this._wheelEvent(event);});
	}

	_keyDownEvent(event) {
		if (this._attachedKeys.has(event.key)) {
      const inputEvent = new KeyDownInputEvent(event.key);

      if (this._signalRouter)
        this._signalRouter.emitSignal('keyDownEvent', inputEvent);
      
			this.downKeys.add(event.key);

			if (this._keyDownListener)
				this._keyDownListener(inputEvent);

			event.preventDefault();
		}
	}

	_keyUpEvent(event) {
		if (this._attachedKeys.has(event.key)) {
      const inputEvent = new KeyUpInputEvent(event.key);

      if (this._signalRouter)
        this._signalRouter.emitSignal('keyUpEvent', inputEvent);

			this.downKeys.delete(event.key);

			if (this._keyUpListener)
				this._keyUpListener(inputEvent);

			event.preventDefault();
		}
	}

	_mouseDownEvent(event) {
    const elementRect = this.element.getBoundingClientRect();
    const inputEvent = new MouseDownInputEvent(
      new Vector2(event.clientX - elementRect.left, 
        event.clientY - elementRect.top), 
        event.button
    );

    if (this._signalRouter)
      this._signalRouter.emitSignal('mouseDownEvent', inputEvent);
      
		if (this._mouseDownListener)
			this._mouseDownListener(inputEvent);
		
		event.preventDefault();
	}

	_mouseUpEvent(event) {
		const elementRect = this.element.getBoundingClientRect();
    const inputEvent = new MouseUpInputEvent(
      new Vector2(event.clientX - elementRect.left, 
        event.clientY - elementRect.top), 
        event.button
    );

    if (this._signalRouter)
      this._signalRouter.emitSignal('mouseUpEvent', inputEvent);
      
		if (this._mouseUpListener)
			this._mouseUpListener(inputEvent);
		
		event.preventDefault();
	}

	_mouseMoveEvent(event) {
		const elementRect = this.element.getBoundingClientRect();
    const eventPosition = new Vector2(
      event.clientX - elementRect.left, 
      event.clientY - elementRect.top
    );
    const inputEvent = new MouseMoveInputEvent(
      eventPosition, 
      event.button
    );

    this._mousePosition = new Vector2(eventPosition.x, eventPosition.y);

    if (this._signalRouter)
      this._signalRouter.emitSignal('mouseMoveEvent', inputEvent);
      
		if (this.mouseMoveListener)
			this.mouseMoveListener(inputEvent);
		
		event.preventDefault();
  }
  
  _wheelEvent(event) {
    const inputEvent = new WheelEvent(
      new Vector2(event.deltaX, event.deltaY)
    );

    if (this._signalRouter)
      this._signalRouter.emitSignal('wheelEvent', inputEvent);
    
    event.preventDefault();
  }

	attachKey(key) {
		this._attachedKeys.add(key);
    Logger.info(`'${key}' attached. `);
	}

	isDown(key) {
		return this.downKeys.has(key);
  }
  
  get mousePosition() {
    return new Vector2(this._mousePosition.x, this._mousePosition.y);
  }
}

export { InputManager };
export default InputManager;