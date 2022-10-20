import { BindingKey, BindingScope } from "../binding";
import { inject, injectable } from "../decorators";

export const HELLO_SERVICE = BindingKey.create("hello.service");
export const HELLO_CONTROLLER = BindingKey.create("hello.controller");
export const HELLO_PROVIDER = BindingKey.create("hello.provider");
export const UNKNOWN_SERVICE = BindingKey.create("unknown.service");

@injectable(BindingScope.SINGLETON)
export class HelloService {}

export class HelloController {
  @inject(HELLO_SERVICE)
  private helloService: HelloService;
}

@injectable({
  bindingScope: BindingScope.TRANSIENT,
})
export class HelloProvider {
  constructor(
    @inject(HELLO_SERVICE)
    private helloService: HelloService
  ) {}
}

export class UnknownService {}
