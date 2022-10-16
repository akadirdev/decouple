# decouple

A dependency injection library based on `IoC` Container. `Dependency Injection` implementation for Node.js projects written with `Typescript`. Build a container and permit it for all dependencies. Get all injectable objects easly without use `new` keyword. It's light-weight library and easy-to-use.

## Installation

`npm i @decouple/core`

## Usage

First, create a `Container` object, then introduce your classes to Container with its `.injectable()` function.

```
const container = new Container();
container.injectable(UserController);
container.injectable(UserService);

const obj = container.get(UserService);
obj.which();
```
