import { Container } from "./container";
import { UserController } from "./examples/controllers/user.controller";
import { UserService } from "./examples/services/user.service";

// example
const main = async () => {
  const container = new Container();
  container.injectable(UserController);
  container.injectable(UserService);

  const obj = container.get(UserService);
  obj.which();
};

main();
