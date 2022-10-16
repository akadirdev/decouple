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
