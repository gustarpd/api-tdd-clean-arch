import { MissingParamError } from "../../utils/errors/missing-params-error";
import { InvalidParamError } from "../../utils/errors/invalid-params-error";
import { AuthUseCase } from './auth-usecase'

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  loadUserByEmailRepositorySpy.user = {}
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy);

  return {
    sut,
    loadUserByEmailRepositorySpy
  }
}

describe("Auth use case", () => {
  test("should return null if no email is provided", async () => {
    const { sut } = makeSut();
    const promise = sut.auth();
    expect(promise).rejects.toThrow(new MissingParamError("email"));
  });

  test("should return null if no email is provided", async () => {
    const { sut } = makeSut();
    const promise = sut.auth("any_email@mail.com");
    expect(promise).rejects.toThrow(new MissingParamError("password"));
  });

  test("should call LoadUserByEmail repository with correct email", async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth("any_mail@mail.com", "any_password");
    expect(loadUserByEmailRepositorySpy.email).toBe('any_mail@mail.com');
  });

  test("should throw if no LoadUserByEmailRepository is provided", async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth("any_mail@mail.com", "any_password");
    expect(promise).rejects.toThrow();
  });

  test("should throw if LoadUserByEmailRepository has no load method", async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth("any_mail@mail.com", "any_password");
    expect(promise).rejects.toThrow();
  });

  test("should return null if LoadUserByEmailRepository returns null", async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth("invalid_mail@mail.com", "any_password");
    expect(accessToken).toBeNull()
  });

  test("should returns null if LoadUserByEmailRepository returns null", async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth("invalid_mail@mail.com", "invalid_password");
    expect(accessToken).toBeNull()
  });
});
