export class BindingKey {
  readonly _key: symbol;

  private constructor(key: string) {
    this._key = Symbol(key);
  }

  public static create(key: string): BindingKey {
    return new BindingKey(key);
  }
}
