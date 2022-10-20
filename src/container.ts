import { BindingKey, BindingScope } from "./binding";
import { InjectableOptions } from "./decorators";
import { DependencyConstructor } from "./dependency/dependency-constructor";
import { logger } from "./logger";
import { getMetadata } from "./metadata";
import { Constructor, Injectable, InjectAt } from "./types";

export class Container {
  private dependencies: { [key: PropertyKey]: any };
  private caches: { [key: PropertyKey]: any };
  private dependencyConstructors: Map<PropertyKey, DependencyConstructor<any>>;

  constructor() {
    this.dependencies = {};
    this.caches = {};
    this.dependencyConstructors = new Map<
      PropertyKey,
      DependencyConstructor<any>
    >();
  }

  public injectable<T>(
    bindingKey: BindingKey,
    ctor: Constructor<T>
  ): DependencyConstructor<T> {
    const key: symbol = bindingKey._key;
    logger.debug("injectable.bindingKey:" + key.toString());

    Object.defineProperty(this.dependencies, key, {
      get: () => {
        logger.debug("defineProperty.get:" + key.toString());
        const dc = this.dependencyConstructors.get(key);
        if (!dc)
          throw new Error(
            `${key.toString()} was not introduce as a injectable class!`
          );
        if (dc.bindingScope === BindingScope.SINGLETON) {
          if (!this.caches.hasOwnProperty(key)) {
            this.caches[key] = this.createDependencyObject(key);
          }
          logger.debug(`${key.toString()} get as singleton`);
          return this.caches[key];
        } else if (dc.bindingScope === BindingScope.TRANSIENT) {
          logger.debug(`${key.toString()} get as transient and create new one`);
          return this.createDependencyObject(key);
        } else {
          throw new Error(
            `BindingScope:${dc.bindingScope} not specified before for decouple.js`
          );
        }
      },
      configurable: true,
      enumerable: true,
    });

    const bindingScope = this.getBindingScopeFromMetadata(ctor);
    logger.debug(
      "injectable.bindingScope:" + key.toString() + ":" + bindingScope
    );
    const dc = new DependencyConstructor(ctor, bindingKey, bindingScope);
    this.dependencyConstructors.set(key, dc);
    return dc;
  }

  public get<T>(bindingKey: BindingKey): T {
    console.log("get", bindingKey);

    return this.dependencies[bindingKey._key];
  }

  public test(n1: number, n2: number): number {
    return n1 + n2;
  }

  private getBindingScopeFromMetadata<T>(
    ctor: Constructor<T>
  ): BindingScope | undefined {
    const metaOption = getMetadata(
      ctor,
      "meta:injectableOptions"
    ) as InjectableOptions;
    console.log("metaOption", metaOption);

    return metaOption?.bindingScope;
  }

  private createDependencyObject(key: PropertyKey): object {
    const ctor = this.dependencyConstructors.get(key).ctor;
    logger.debug("createDependencyObject.ctor:" + ctor.name);
    const depens =
      (getMetadata(ctor, "meta:injectables") as Injectable[]) ?? [];

    logger.debug("createDependencyObject.depens:" + JSON.stringify(depens));

    const args = depens
      .filter((f) => f.injectAt === InjectAt.CONSTRUCTOR)
      .map((m) => {
        logger.debug("InjectAt.CONSTRUCTOR:" + JSON.stringify(m));
        return this.dependencies[m.bindingKey._key];
      });

    const obj = new ctor(...args);

    depens
      .filter((f) => f.injectAt === InjectAt.PROPERTY)
      .map((m) => {
        logger.debug("InjectAt.PROPERTY:" + JSON.stringify(m));
        obj[m.property] = this.dependencies[m.bindingKey._key];
      });

    return obj;
  }
}
