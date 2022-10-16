import { getMetadata } from "./metadata";
import { Constructor, Injectable, InjectAt } from "./types";

export class Container {
  private dependencies: { [key: string]: any };
  private caches: { [key: string]: any };
  private dependencyConstructors: Map<string, Constructor<any>>;

  constructor() {
    this.dependencies = {};
    this.caches = {};
    this.dependencyConstructors = new Map<string, Constructor<any>>();
  }

  public injectable<T>(ctor: Constructor<T>): void {
    const key = ctor.name;

    Object.defineProperty(this.dependencies, key, {
      get: () => {
        if (!this.caches.hasOwnProperty(key)) {
          this.caches[key] = this.createDependencyObject(key);
        }

        return this.caches[key];
      },
      configurable: true,
      enumerable: true,
    });

    this.dependencyConstructors.set(key, ctor);
  }

  public get<T>(ctor: Constructor<T>): T {
    return this.dependencies[ctor.name];
  }

  private createDependencyObject(key: string): object {
    const ctor = this.dependencyConstructors.get(key);
    console.log("ctor:", ctor);

    const depens =
      (getMetadata(ctor, "meta:injectables") as Injectable<any>[]) ?? [];

    console.log("depens:", depens);

    const args = depens
      .filter((f) => f.injectAt === InjectAt.CONSTRUCTOR)
      .map((m) => this.dependencies[m.ctor.name]);

    const obj = new ctor(...args);

    depens
      .filter((f) => f.injectAt === InjectAt.PROPERTY)
      .map((m) => {
        obj[m.property] = this.dependencies[m.ctor.name];
      });

    return obj;
  }
}
