import { between } from "..";
import { BindingScope } from "../../../binding";
import { injectable } from "../../../decorators";

@injectable(BindingScope.SINGLETON)
export class RoleService {
  private _id: number;

  constructor() {
    this._id = between(1, 10000);
  }

  which() {
    console.log("RoleService:" + this._id);
  }
}
