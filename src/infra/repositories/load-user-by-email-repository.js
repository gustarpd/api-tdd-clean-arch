import { MissingParamError } from "../utils/errors/missing-params-error";
import { MemoryServerMongo } from "./helper/mongo-in-memory-server";

export class LoadUserByEmailRepository {
  async load(email) {
    const user = (await helper.getCollection("users")).findOne({
      email,
    });
    return user;
  }
}
