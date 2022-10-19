import { BindingKey } from "./binding";

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
