import { inject, injectable } from "../../../decorators";
import { BindingScope } from "../../../types";
import { UserService } from "../services/user.service";

@injectable(BindingScope.TRANSIENT)
export class UserController {
  @inject(UserService)
  private userService: UserService;

  which() {
    console.log("UserController");
    this.userService.which();
  }
}
