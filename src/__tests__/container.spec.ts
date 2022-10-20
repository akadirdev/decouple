import { expect } from "chai";
import { BindingKey } from "../binding";
import { Container } from "../container";

describe("Container", () => {
  let container: Container;

  before(() => {
    container = new Container();
  });

  describe("get", () => {
    it("should get object successfully", function () {
      const res = container.get(BindingKey.create("asd"));
      expect(res).to.be.undefined;
    });
  });
});
