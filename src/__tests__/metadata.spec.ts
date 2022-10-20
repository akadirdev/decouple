import "reflect-metadata";
import { expect } from "chai";
import { getMetadata, setMetadata } from "../metadata";
import { HelloService } from "./injectable-class.spec.helper";

describe("metadata", () => {
  describe("setMetadata", () => {
    it("should set metadata with target constructor form successfully", () => {
      setMetadata(HelloService, "meta:key", "foo");
    });

    it("should set metadata with target object form successfully", () => {
      setMetadata(new HelloService(), "meta:key-2", "bar");
    });
  });

  describe("getMetadata", () => {
    it('should get metadata with target object form via "meta:key" successfully', () => {
      const res = getMetadata(new HelloService(), "meta:key");
      expect(res).to.equal("foo");
    });

    it('should return undefined when not set metadata with target constructor form via "meta:key" before', () => {
      const res = getMetadata(HelloService, "meta:key-unknown");
      expect(res).to.equal(undefined);
    });
  });
});
