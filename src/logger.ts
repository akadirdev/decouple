class Logger {
  debug(msg: string) {
    console.log("env", process.env.DEBUG);

    if (process.env.DEBUG === "decouple") console.log(msg);
  }
}

export const logger = new Logger();
