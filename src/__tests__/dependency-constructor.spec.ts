import { expect } from "chai";
import { BindingKey, BindingScope } from "../binding";
import { DependencyConstructor } from "../dependency";
import { HelloService } from "./injectable-class.spec.helper";

describe("DependencyConstructor", () => {
  let dc: DependencyConstructor<HelloService>;
  let bindingKey;

  describe("when bindingScope is not given in constructor", () => {
    before(() => {
      bindingKey = BindingKey.create("sample-1");
      dc = new DependencyConstructor(HelloService, bindingKey);
    });

    it("should get bindingScope as TRANSIENT", () => {
      const res = dc.bindingScope;
      expect(res).to.be.eql(BindingScope.TRANSIENT);
    });
  });

  describe("when bindingScope is given in constructor", () => {
    before(() => {
      bindingKey = BindingKey.create("sample-1");
      dc = new DependencyConstructor(
        HelloService,
        bindingKey,
        BindingScope.SINGLETON
      );
    });

    it("should get bindingScope as SINGLETON as given", () => {
      const res = dc.bindingScope;
      expect(res).to.be.eql(BindingScope.SINGLETON);
    });
  });

  describe("when bindingScope is not given in constructor but given in .scope()", () => {
    before(() => {
      bindingKey = BindingKey.create("sample-1");
      dc = new DependencyConstructor(HelloService, bindingKey);
    });

    it("should get bindingScope as SINGLETON as given", () => {
      expect(dc.bindingScope).to.be.eql(BindingScope.TRANSIENT);
      dc.scope(BindingScope.SINGLETON);
      expect(dc.bindingScope).to.be.eql(BindingScope.SINGLETON);
    });
  });
});
