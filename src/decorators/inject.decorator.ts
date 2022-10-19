import { logger } from "../logger";
import { getMetadata, setMetadata } from "../metadata";
import { BindingKey, Injectable, InjectAt } from "../types";

export const inject = (bindingKey: BindingKey) => {
  return (target: Object, propertyKey: string, parameterIndex?: number) => {
    logger.debug("inject.bindingKey:" + bindingKey);
    logger.debug("inject.propertyKey:" + propertyKey);
    logger.debug("inject.parameterIndex:" + parameterIndex);
    const injectables: Injectable[] =
      getMetadata(target, "meta:injectables") ?? [];

    injectables.push({
      bindingKey,
      ctor: undefined,
      property: propertyKey,
      injectAt:
        parameterIndex !== undefined ? InjectAt.CONSTRUCTOR : InjectAt.PROPERTY,
      parameterIndex: parameterIndex,
    } as Injectable);

    setMetadata(target, "meta:injectables", injectables);
  };
};
