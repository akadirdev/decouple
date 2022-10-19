export type Constructor<T> = new (...args: any[]) => T;

export enum InjectAt {
  PROPERTY = "PROPERTY",
  CONSTRUCTOR = "CONSTRUCTOR",
}

export interface Injectable {
  bindingKey: BindingKey;
  ctor?: Constructor<any>;
  property?: string;
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

export class BindingKey {
  readonly _key: symbol;

  private constructor(key: string) {
    this._key = Symbol(key);
  }

  public static create(key: string): BindingKey {
    return new BindingKey(key);
  }
}

export class DependencyConstructor<T> {
  public ctor: Constructor<T>;
  private _bindingScope: BindingScope;
  private _bindingKey: BindingKey;

  constructor(
    ctor: Constructor<T>,
    bindingKey: BindingKey,
    bindingScope?: BindingScope
  ) {
    this.ctor = ctor;
    this._bindingKey = bindingKey;
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
