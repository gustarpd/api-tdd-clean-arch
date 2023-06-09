import JWT from "jsonwebtoken";
import { TokenGenerator } from "../token-generator";
import { MissingParamError } from "../errors/missing-params-error";

jest.mock('jsonwebtoken', () => ({
  token: "any_token",
  user: { id: "123" },
  sign(id, secret) {
    this.id = id,
    this.secret = secret
    return this.token;
  },
  verify(value) {
    this.secret = value
    return this.user;
  },
}))

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
  test("Should throw if no secret is provided", async () => {
    const sut = new TokenGenerator();
    const promise = sut.generate("any_id");
    expect(promise).rejects.toThrow(new MissingParamError('secret'));
  });
  test("Should throw if no id is provided", async () => {
    const sut = makeSut();
    const promise = sut.generate();
    expect(promise).rejects.toThrow(new MissingParamError('id'));
  });

  test("Should throw if no id is provided", async () => {
    const tokenGenerator = new TokenGenerator("secret");
    const value = "token";
    const decryptedValue = await tokenGenerator.decrypt(value);
    expect(decryptedValue).toEqual({ id: "123" });
  });
});
