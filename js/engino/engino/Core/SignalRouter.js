class SignalRouter {
	constructor() {
    this._signalListeners = {};
    this._pendingSignals = [];
	}

	attachListener(signal, listener) {
		if (!(signal in this._signalListeners))
			this._signalListeners[signal] = [];
		this._signalListeners[signal].push(listener);
	}

	emitSignal(signal, ...args) {
    this._pendingSignals.push({ signal, args });
  }
  
  distributeSignals() {
    while (this._pendingSignals.length > 0) {
      const { signal, args } = this._pendingSignals.shift();
      if (signal in this._signalListeners)
        this._signalListeners[signal].forEach((listener) => {
          listener(...args);
        });
    }
  }
}

export { SignalRouter };
export default SignalRouter;