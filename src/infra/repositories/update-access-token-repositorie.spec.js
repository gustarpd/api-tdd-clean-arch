import { User } from "../db/schemas/Users";
import { connect, disconnect } from "../helper/mongo-in-memory-server";

class UpdateAccessTokenRepository {
  async update(userId, accessToken) {
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

describe("UpdateAccessToken Repository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    User.deleteMany({});
  });

  test("should update the user with the given accessToken", async () => {
    const sut = new UpdateAccessTokenRepository();
    const fakeUser = await User.create({
      email: "valid_email@mail.com",
      name: "any_name",
      age: 50,
      state: "any_state",
      password: "hashed_password",
    });
    await sut.update(fakeUser._id, "valid_token");
    const updatedFakeUser = await User.findOne({
      _id: fakeUser._id,
    });
    expect(updatedFakeUser.accessToken).toBe("valid_token");
  });
});
