import { MissingParamError } from "../../utils/errors/missing-params-error";
import { User } from "../db/schemas/Users";

export class LoadUserByTokenlRepository {
  async loadByToken(accessToken) {
    if (!accessToken) {
      throw new MissingParamError("accessToken");
    }

    const load = User.findOne({
      accessToken,
    });

    return load;
  }
}
