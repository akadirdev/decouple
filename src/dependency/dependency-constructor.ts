import { BindingKey, BindingScope } from "../binding";
import { Constructor } from "../types";

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
