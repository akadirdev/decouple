import { between } from "..";
import { inject } from "../../../decorators";
import { ROLE_SERVICE } from "../keys";
import { RoleService } from "./role.service";

export class UserService {
  @inject(ROLE_SERVICE)
  private rolervice: RoleService;

  private _id: number;

  constructor() {
    this._id = between(1, 1000);
  }

  which() {
    console.log("UserService:" + this._id);
    this.rolervice.which();
  }
}
