import { getMetadata, setMetadata } from "../metadata";
import { Constructor, Injectable, InjectAt } from "../types";

export const inject = <T>(ctor: Constructor<T> | Function) => {
  return (target: Object, propertyKey: string, parameterIndex?: number) => {
    const injectables: Injectable<any>[] =
      getMetadata(target, "meta:injectables") ?? [];

    injectables.push({
      ctor: ctor,
      property: propertyKey,
      injectAt:
        parameterIndex !== undefined ? InjectAt.CONSTRUCTOR : InjectAt.PROPERTY,
      parameterIndex: parameterIndex,
    } as Injectable<T>);

    setMetadata(target, "meta:injectables", injectables);
  };
};
