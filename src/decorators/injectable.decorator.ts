import { BindingScope } from "../binding";
import { setMetadata } from "../metadata";

export interface InjectableOptions {
  bindingScope: BindingScope;
}

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
