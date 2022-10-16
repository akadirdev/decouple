import { inject } from "../../../decorators";
import { RoleService } from "./role.service";

export class UserService {
  @inject(RoleService)
  private rolervice: RoleService;

  which() {
    console.log("UserService");
    this.rolervice.which();
  }
}
