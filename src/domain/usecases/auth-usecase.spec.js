import { MissingParamError } from "../../utils/errors/missing-params-error";

class AuthUseCase {
  async auth(email, password) {
    if (!email) {
      throw new MissingParamError("email");
    }
    if (!password) {
      throw new MissingParamError("password");
    }
  }
}

describe("Auth use case", () => {
  test("should return null if no email is provided", async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth();
    expect(promise).rejects.toThrow(new MissingParamError("email"));
  });

  test("should return null if no email is provided", async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth("any_email@mail.com");
    expect(promise).rejects.toThrow(new MissingParamError("password"));
  });
});
