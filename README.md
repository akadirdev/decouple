<p align="center">
  <img src="./public/logo-decouplejs.png">
</p>
<p align="center">
  <img src="https://img.shields.io/bower/l/decouple">
  <img src="https://img.shields.io/github/v/release/akadirdev/decouple">
  <img src="https://img.shields.io/bundlephobia/min/@decouplejs/core">
  <img src="https://img.shields.io/npm/dw/@decouplejs/core">
  <img src="https://img.shields.io/github/last-commit/akadirdev/decouple">
  <img src="https://dl.circleci.com/status-badge/img/gh/akadirdev/decouple/tree/release.svg?style=shield">
  <img src="https://coveralls.io/repos/github/akadirdev/decouple/badge.svg?branch=release">
</p>

A dependency injection library based on `IoC` Container. `Dependency Injection` implementation for Node.js projects written with `Typescript`. Build a container and permit it for all dependencies. Get all injectable objects easily without use `new` keyword. It's light-weight library and easy-to-use.

## Installation

`npm i @decouplejs/core`

And add below to `compilerOptions` in `tsconfig.json`

```
"experimentalDecorators": true
```

## Usage

Lets think about you have two classes which are `UserController` and `UserService`.

`UserController` have a dependency to `UserService` which is declared with `@inject` decorator.

```TypeScript
export class UserController {
  constructor(
    @inject(USER_SERVICE)
    private userService: UserService
  ) {}

  print() {
    console.log("UserController");
    this.userService.print();
  }
}
```

```TypeScript
export class UserService {
  constructor() {}

  print() {
    console.log("UserService");
  }
}
```

When we used `@inject` decorator, `USER_SERVICE` binding key was declared. Lets define this binding keys.

Create a `keys.ts` file and define binding keys to be associated with above classes like below:

```TypeScript
export const USER_CONTROLLER = BindingKey.create("user.controller");
export const USER_SERVICE = BindingKey.create("user.service");
```

Now, create a `Container` and introduce your classes to IoC Container via its `.injectable()` function with binding keys that are defined before.

```TypeScript
const container = new Container();
container.injectable(USER_CONTROLLER, UserController);
container.injectable(USER_SERVICE, UserService);
```

Finally, if you want to create and use a `UserController` instance, call `.get()` of Container with `USER_CONTROLLER` key.

```TypeScript
const controller = container.get(USER_CONTROLLER);
controller.print();

// output
// UserController
// UserService
```

## @inject decorator

```TypeScript
export class UserController {
  constructor(
    @inject(USER_SERVICE)
    private userService: UserService
  ) {}
  // ...
}
```

With `@inject` decorator, decouple.js understand which dependent classes instances will be initialize and assign during create a new base class instance.

You can also use `@inject' decorator as property decorator like constructor parameter decorator as below.

```TypeScript
export class UserController {
  @inject(USER_SERVICE)
  private userService: UserService;

  constructor() {}
  // ...
}
```

## Binding Scopes

Specifies how long the created objects will live and how many times they should be created during the application lifecycle. Scopes can be defined by two way:

1. via `.scope()` function while class is introducing with`.injectable()`

```TypeScript
container.injectable(USER_CONTROLLER, UserController).scope(BindingScope.SINGLETON);
```

2. via `@injectable` decorator which is above class definition

```TypeScript
@injectable(BindingScope.SINGLETON)
export class UserController {
  // ...
}
```

One of scope definition methods is enough for a injectable class.

> If two methods are used at the same time, the scope of method 1 will be valid.

> If no scope is specified, the TRANSIENT scope will be valid.

Decouple.js supports two types of scope for now:

> ### SINGLETON
>
> > Only one instance will be created during the application lifecycle and this same instance will be used by all dependent classes too.

> ### TRANSIENT
>
> > A new instance will be created for each need of the class instance.

## Example Implementation

- [Decouple.js Implementation Example With Express.js](https://github.com/akadirdev/decouple-express-example)

## Next Features

1. [express.js](https://expressjs.com/ "express.js") middleware support.
2. BindingScope.REQUEST support

## License

Copyright © 2022 Abdulkadir Dede.

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/akadirdev/decouple/blob/release/LICENSE.md "LICENSE") for details.
