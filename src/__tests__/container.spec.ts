import { expect } from "chai";
import { Container } from "../container";

describe("Container", () => {
  let container: Container;

  before(() => {
    container = new Container();
  });

  describe("test-func", () => {
    it("should sum two value: 2 + 3 = 5", () => {
      const res = container.test(2, 3);
      expect(res).to.be.equal(5);
    });
  });
});
