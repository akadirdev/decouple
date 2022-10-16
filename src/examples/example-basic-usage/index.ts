import { Container } from "../../container";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

// example
const main = async () => {
  const container = new Container();
  container.injectable(UserController);
  container.injectable(UserService);

  const obj = container.get(UserController);
  obj.which();
};

main();
