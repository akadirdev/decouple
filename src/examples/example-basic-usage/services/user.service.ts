import { inject } from "../../../decorators";
import { UserController } from "../controllers/user.controller";

export class UserService {
  constructor(
    @inject(() => UserController)
    private userController: UserController
  ) {}

  which() {
    console.log("UserService");
  }
}
