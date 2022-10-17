import { logger } from "./logger";
import { getMetadata } from "./metadata";
import {
  BindingScope,
  Constructor,
  DependencyConstructor,
  Injectable,
  InjectableOptions,
  InjectAt,
} from "./types";

export class Container {
  private dependencies: { [key: string]: any };
  private caches: { [key: string]: any };
  private dependencyConstructors: Map<string, DependencyConstructor<any>>;

  constructor() {
    this.dependencies = {};
    this.caches = {};
    this.dependencyConstructors = new Map<string, DependencyConstructor<any>>();
  }

  public injectable<T>(ctor: Constructor<T>): DependencyConstructor<T> {
    const key = ctor.name;
    logger.debug("injectable.key:" + key);

    Object.defineProperty(this.dependencies, key, {
      get: () => {
        logger.debug("defineProperty.get:" + key);
        const dc = this.dependencyConstructors.get(key);
        if (!dc)
          throw new Error(`${key} was not introduce as a injectable class!`);
        if (dc.bindingScope === BindingScope.SINGLETON) {
          if (!this.caches.hasOwnProperty(key)) {
            this.caches[key] = this.createDependencyObject(key);
          }
          logger.debug(`${key} get as singleton`);
          return this.caches[key];
        } else if (dc.bindingScope === BindingScope.TRANSIENT) {
          logger.debug(`${key} get as transient and create new one`);
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
    logger.debug("injectable.bindingScope:" + key + ":" + bindingScope);
    const dc = new DependencyConstructor(ctor, bindingScope);
    this.dependencyConstructors.set(key, dc);
    return dc;
  }

  public get<T>(ctor: Constructor<T>): T {
    return this.dependencies[ctor.name];
  }

  private getBindingScopeFromMetadata<T>(
    ctor: Constructor<T>
  ): BindingScope | undefined {
    const metaOption = getMetadata(
      ctor,
      "meta:injectableOptions"
    ) as InjectableOptions;

    return metaOption?.bindingScope;
  }

  private createDependencyObject(key: string): object {
    const ctor = this.dependencyConstructors.get(key).ctor;
    logger.debug("createDependencyObject.ctor:" + ctor.name);
    const depens =
      (getMetadata(ctor, "meta:injectables") as Injectable<any>[]) ?? [];

    logger.debug("createDependencyObject.depens:" + JSON.stringify(depens));

    const args = depens
      .filter((f) => f.injectAt === InjectAt.CONSTRUCTOR)
      .map((m) => {
        logger.debug("InjectAt.CONSTRUCTOR:" + JSON.stringify(m));
        return this.dependencies[m.ctor.name];
      });

    const obj = new ctor(...args);

    depens
      .filter((f) => f.injectAt === InjectAt.PROPERTY)
      .map((m) => {
        logger.debug("InjectAt.PROPERTY:" + JSON.stringify(m));
        obj[m.property] = this.dependencies[m.ctor.name];
      });

    return obj;
  }
}
