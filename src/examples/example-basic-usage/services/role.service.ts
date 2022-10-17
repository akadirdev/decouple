import { between } from "..";
import { injectable } from "../../../decorators";
import { BindingScope } from "../../../types";

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
