import JWT from "jsonwebtoken";

class TokenGenerator {
  async generate(id) {
    return JWT.sign(id, "secret");
  }
}

const makeSut = () => {
  return new TokenGenerator();
};

describe("Token Generator", () => {
  test("Should return null if JWT returns null", async () => {
    const sut = makeSut();
    JWT.token = null;
    const token = await sut.generate("any_id");
    expect(token).toBe(null);
  });
  test("Should token f JWT retun token", async () => {
    const sut = makeSut();
    const token = await sut.generate("any_id");
    expect(token).toBe(JWT.token);
  });
});
