import { MissingParamError } from "../../utils/errors/missing-params-error";
import { User } from "../db/schemas/Users";

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
