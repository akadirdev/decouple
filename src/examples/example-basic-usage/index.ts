import { Container } from "../../container";
import { UserController } from "./controllers/user.controller";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";

// example
export const example1 = async () => {
  const container = new Container();
  container.injectable(UserController);
  container.injectable(UserService);
  container.injectable(RoleService);

  const obj = container.get(UserController);
  obj.which();
};
