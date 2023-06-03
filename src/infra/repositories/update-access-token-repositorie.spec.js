import { MemoryServerMongo } from "../helper/mongo-in-memory-server";

let helper = new MemoryServerMongo();

class UpdateAccessTokenRepository {
  async update(userId, accessToken) {
    await (
      await helper.getCollection("users")
    ).updateOne(
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
    helper.connect();
  });

  afterAll(async () => {
    helper.disconnect();
  });

  beforeEach(async () => {
    (await helper.getCollection("users")).deleteMany({});
  });

  test("should update the user with the given accessToken", async () => {
    const userModel = await helper.getCollection("users");
    const sut = new UpdateAccessTokenRepository();
    const fakeUser = await (await helper.getCollection("users")).insertOne({
      email: "valid_email@mail.com",
      name: "any_name",
      age: 50,
      state: "any_state",
      password: "hashed_password",
    });
    await sut.update(fakeUser._id, "valid_token");
    const updatedFakeUser =  await (await helper.getCollection("users")).findOne({
      _id: fakeUser._id,
    });
    console.log(updatedFakeUser);
    expect(updatedFakeUser.accessToken).toBe("valid_token");
  });
});
