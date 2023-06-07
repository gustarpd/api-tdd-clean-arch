import { connect, disconnect } from "../../helper/mongo-in-memory-server";
import { User } from "../../db/schemas/Users";

class LoadUserByTokenlRepository {
  async loadByToken(accessToken) {
    if (!accessToken) {
      throw new Error();
    }

    const load = User.findOne({
      accessToken,
    });

    return load;
  }
}

const makeSut = () => {
  const sut = new LoadUserByTokenlRepository();
  return {
    sut,
  };
};

describe("LoadUserByToken Repository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("should return a user with accessToken if their accessToken are provided", async () => {
    const { sut } = makeSut();
    const user = await User.create({
      accessToken: "anyToken",
    });
    const userLoaded = await sut.loadByToken(user.accessToken);
    expect(userLoaded).toHaveProperty("accessToken");
  });

  test("should thows if token is not provided", async () => {
    const { sut } = makeSut();
    await expect(sut.loadByToken()).rejects.toThrow();
  });
});
