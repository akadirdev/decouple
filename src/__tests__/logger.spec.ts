import { logger } from "../logger";

describe("Logger", () => {
  describe("debug", () => {
    it("should not log debug logs", () => {
      logger.debug("hello");
    });
  });
});
