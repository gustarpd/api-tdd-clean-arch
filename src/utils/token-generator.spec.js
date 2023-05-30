import JWT from "jsonwebtoken";

class TokenGenerator {
  constructor(secret) {
    this.secret = secret;
  }
  async generate(id) {
    return JWT.sign(id, this.secret);
  }
}

const makeSut = () => {
  return new TokenGenerator("secret");
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
  test("Should call JWT with correct values", async () => {
    const sut = makeSut();
    await sut.generate("any_id");
    expect(JWT.id).toBe("any_id");
    expect(JWT.secret).toBe(sut.secret);
  });
});
