import { MissingParamError } from "../../utils/errors/missing-params-error";
import { MemoryServerMongo } from "../helper/mongo-in-memory-server";
import { User } from "../db/schemas/Users";

export class LoadUserByEmailRepository {
  async load(email) {
    const user = await User.findOne({
      email,
    });
    return user;
  }
}
