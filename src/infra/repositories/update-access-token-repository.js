import { MissingParamError } from "../../utils/errors/missing-params-error";
import { User } from "../db/schemas/Users";

export class UpdateAccessTokenRepository {
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
