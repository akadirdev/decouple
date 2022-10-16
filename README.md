# decouple

A dependency injection library based on `IoC` Container. `Dependency Injection` implementation for Node.js projects written with `Typescript`. Build a container and permit it for all dependencies. Get all injectable objects easily without use `new` keyword. It's light-weight library and easy-to-use.

## Installation

`npm i @decouple/core`

## Usage

Lets think about you have two classes which are `UserController` and `UserService`.

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

`UserController` have a dependency to `UserService` which is declared with `@inject` decorator.

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
