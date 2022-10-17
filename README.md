# decouplejs

<p align="center">
  <img src="./logo-decouplejs.png">
</p>
<p align="center">
  <img src="https://img.shields.io/bower/l/decouple">
  <img src="https://img.shields.io/github/v/release/akadirdev/decouple">
  <img src="https://img.shields.io/bundlephobia/min/@decouplejs/core">
  <img src="https://img.shields.io/npm/dw/@decouplejs/core">
  <img src="https://img.shields.io/github/last-commit/akadirdev/decouple">
</p>

A dependency injection library based on `IoC` Container. `Dependency Injection` implementation for Node.js projects written with `Typescript`. Build a container and permit it for all dependencies. Get all injectable objects easily without use `new` keyword. It's light-weight library and easy-to-use.

## Installation

`npm i @decouple/core`

And add below `compilerOptions` to `tsconfig.json`

```
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

## Usage

Lets think about you have two classes which are `UserController` and `UserService`.

`UserController` have a dependency to `UserService` which is declared with `@inject` decorator.

```
export class UserController {
  constructor(
    @inject(UserService)
    private userService: UserService
  ) {}

  print() {
    console.log("UserController");
    this.userService.print();
  }
}
```

```
export class UserService {
  constructor() {}

  print() {
    console.log("UserService");
  }
}
```

Then, create a `Container` object and introduce your classes to IoC Container with its `.injectable()` function.

```
const container = new Container();
container.injectable(UserController);
container.injectable(UserService);
```

Finally, if you want to create and use a `UserController` object, use `.get()` function of Container.

```
const controller = container.get(UserController);
controller.print();

// output
// UserController
// UserService
```

## @inject decorator

```
export class UserController {
  constructor(
    @inject(UserService)
    private userService: UserService
  ) {}
  ...
}
```

With `@inject` decorator, decouple.js understand which dependent classes instances will be initialize and assign during create a new base class instance.

You can also use `@inject' decorator as property decorator like constructor parameter decorator as below.

```
export class UserController {
  @inject(UserService)
  private userService: UserService;

  constructor() {}
  ...
}
```

---

### Next Features

- Scope based instance creatation.
- [express.js](https://expressjs.com/ "express.js") middleware support.

---

Please feel free to open new issues on project github repo.
