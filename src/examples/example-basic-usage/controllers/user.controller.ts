import { BindingScope } from "../../../binding";
import { inject, injectable } from "../../../decorators";
import { USER_SERVICE } from "../keys";
import { UserService } from "../services/user.service";

@injectable(BindingScope.TRANSIENT)
export class UserController {
  @inject(USER_SERVICE)
  private userService: UserService;

  which() {
    console.log("UserController");
    this.userService.which();
  }
}
