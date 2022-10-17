import { Container } from "../../container";
import { BindingScope } from "../../types";
import { UserController } from "./controllers/user.controller";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";

export function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// example
export const example1 = async () => {
  const container = new Container();
  container.injectable(UserController).scope(BindingScope.SINGLETON);
  container.injectable(UserService);
  container.injectable(RoleService);

  const obj = container.get(UserController);
  obj.which();

  const obj1 = container.get(UserService);
  obj1.which();
};
