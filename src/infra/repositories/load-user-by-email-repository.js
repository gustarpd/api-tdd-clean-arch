import { MissingParamError } from "../../utils/errors/missing-params-error.js";
import { User } from "../db/schemas/Users.js";

export class LoadUserByEmailRepository {
  async load(email) {
    if(!email) {
      throw new MissingParamError('email')
    }
    const user = await User.findOne({
      email,
    });
    return user;
  }
}
