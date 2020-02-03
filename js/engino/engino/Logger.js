const LOGLEVEL = {
	INFO: 0, 
	WARNING: 1, 
	ERROR: 2, 
	NONE: 3, 

	0: 'INFO', 
	1: 'WARNING', 
	2: 'ERROR'
};

export const Logger = {
  LOGLEVEL, 
  logLevel: LOGLEVEL.NONE, 
  setLogLevel: function(level) {
    this.logLevel = level;
  }, 
  logMsg: function(msg, level) {
    if (level >= this.logLevel) console.log(`[${this.LOGLEVEL[level]}] ${msg}`);
  }, 
  info: function(msg) {
    this.logMsg(msg, this.LOGLEVEL.INFO);
  }, 
  warning: function(msg) {
    this.logMsg(msg, this.LOGLEVEL.WARNING);
  }, 
  error: function(msg) {
    this.logMsg(msg, this.LOGLEVEL.ERROR);
  }
}

export default Logger;
