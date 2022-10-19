import { Container } from "../../container";
import { BindingScope } from "../../types";
import { UserController } from "./controllers/user.controller";
import { ROLE_SERVICE, USER_CONTROLLER, USER_SERVICE } from "./keys";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";

export function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// example
export const example1 = async () => {
  const container = new Container();
  container
    .injectable(USER_CONTROLLER, UserController)
    .scope(BindingScope.SINGLETON);
  container.injectable(USER_SERVICE, UserService);
  container.injectable(ROLE_SERVICE, RoleService);

  const obj = container.get<UserController>(USER_CONTROLLER);
  obj.which();

  const obj1 = container.get<UserService>(USER_SERVICE);
  obj1.which();
};
