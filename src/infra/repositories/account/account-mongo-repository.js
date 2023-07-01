import { MissingParamError } from "../../../utils/errors/missing-params-error";
import { User } from "../../db/schemas/Users";

export class MongoRepository {
  async add({ name, email, password }) {
    const account = new User({ name, email, password });
    const savedAccount = await account.save();
    return savedAccount;
  }

  async loadByToken(accessToken) {
    if (!accessToken) {
      throw new MissingParamError("accessToken");
    }

    const load = User.findOne({
      accessToken,
    });

    return load;
  }

  async load(email) {
    if (!email) {
      throw new MissingParamError("email");
    }
    const user = await User.findOne({
      email,
    });
    return user;
  }

  async update(userId, accessToken) {
    if (!userId) {
      throw new MissingParamError("userId");
    }

    if (!accessToken) {
      throw new MissingParamError("AccessToken");
    }

    await User.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          accessToken,
        },
      }
    );
  }
}
