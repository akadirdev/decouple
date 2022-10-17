import { setMetadata } from "../metadata";
import { BindingScope, InjectableOptions } from "../types";

export const injectable = (
  injectableOptions?: InjectableOptions | BindingScope
) => {
  return (target: Function) => {
    const opt = {
      bindingScope:
        typeof injectableOptions === "object"
          ? injectableOptions.bindingScope
          : injectableOptions,
    } as InjectableOptions;

    setMetadata(target, "meta:injectableOptions", opt);
  };
};
