export type Constructor<T> = new (...args: any[]) => T;

export enum InjectAt {
  PROPERTY = "PROPERTY",
  CONSTRUCTOR = "CONSTRUCTOR",
}

export interface Injectable<T> {
  ctor: Constructor<T>;
  property?: keyof T;
  injectAt: InjectAt;
  parameterIndex?: number;
}

export enum BindingScope {
  SINGLETON = "SINGLETON",
  TRANSIENT = "TRANSIENT",
}

export interface InjectableOptions {
  bindingScope: BindingScope;
}

export class DependencyConstructor<T> {
  public ctor: Constructor<T>;
  private _bindingScope: BindingScope;

  constructor(ctor: Constructor<T>, bindingScope?: BindingScope) {
    this.ctor = ctor;
    this._bindingScope = bindingScope ?? BindingScope.TRANSIENT;
  }

  public get bindingScope(): BindingScope {
    return this._bindingScope;
  }

  public scope(bindingScope: BindingScope): DependencyConstructor<T> {
    this._bindingScope = bindingScope;
    return this;
  }
}
