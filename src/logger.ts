class Logger {
  private debugMode: boolean;

  constructor(debug = false) {
    this.debugMode = debug;
  }

  debug(msg: string) {
    if (this.debugMode) console.log(msg);
  }
}

export const logger = new Logger();
