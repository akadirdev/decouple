import { expect } from "chai";
import { BindingKey, BindingScope } from "../binding";
import { Container } from "../container";
import {
  HelloController,
  HelloProvider,
  HelloService,
  HELLO_CONTROLLER,
  HELLO_PROVIDER,
  HELLO_SERVICE,
  UnknownService,
  UNKNOWN_SERVICE,
} from "./injectable-class.spec.helper";

describe("Container", () => {
  let container: Container;

  before(() => {
    container = new Container();
    container.injectable(HELLO_CONTROLLER, HelloController);
    container.injectable(HELLO_SERVICE, HelloService);
    container.injectable(HELLO_PROVIDER, HelloProvider);

    container
      .injectable(UNKNOWN_SERVICE, UnknownService)
      .scope("UNKNOWN" as BindingScope);
  });

  describe("get", () => {
    describe("when binding key is unknown", () => {
      const key = BindingKey.create("unknown-1");

      it("should get undefined", () => {
        const res = container.get(key);
        expect(res).to.be.equal(undefined);
      });
    });

    describe("when binding key is defined before and introduce to container via .injectable()", () => {
      it("should get new HelloController instance", () => {
        const res = container.get(HELLO_CONTROLLER);
        expect(res).to.be.not.equal(undefined);
      });

      it("should get singleton HelloService instance", () => {
        const res = container.get(HELLO_SERVICE);
        expect(res).to.be.not.equal(undefined);
      });

      it("should get new HelloProvider instance with constructor injection", () => {
        const res = container.get(HELLO_PROVIDER);
        expect(res).to.be.not.equal(undefined);
      });
    });

    describe("when used unknown binding key", () => {
      it("should throw error", () => {
        expect(() => {
          container.get(UNKNOWN_SERVICE);
        }).to.be.throw(
          `BindingScope:UNKNOWN not specified before for decouple.js`
        );
      });
    });
  });
});
