import dotenv from "dotenv";

dotenv.config();

class Logger {
  debug(msg: string) {
    if (process.env.DEBUG === "decouple") console.log(msg);
  }
}

export const logger = new Logger();
