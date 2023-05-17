import { MissingParamError } from "../../utils/errors/missing-params-error";
import { InvalidParamError } from "../../utils/errors/invalid-params-error";
import { AuthUseCase } from "./auth-usecase";

const makeEncrypter = () => {
  class EncypterSpy {
    async compare(password, hashedPassword) {
      this.password = password;
      this.hashedPassword = hashedPassword;

      return this.isValid;
    }
  }

  const encypterSpy = new EncypterSpy();
  encypterSpy.isValid = true;

  return encypterSpy;
};

const makeTokenGenerator = () => {
  class TokenGenerateSpy {
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }

  const tokenGenerateSpy = new TokenGenerateSpy()
  tokenGenerateSpy.accessToken = 'any_token'
  return tokenGenerateSpy
}
const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      this.email = email;
      return this.user;
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  loadUserByEmailRepositorySpy.user = {
    id: 'any_id',
    hashedpassword: "hashed-password",
  };

  return loadUserByEmailRepositorySpy;
};

const makeSut = () => {
  const encrypterSpy = makeEncrypter();
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy();
  const tokenGenerateSpy = makeTokenGenerator()
  class EncypterSpy {
    async compare(password, hashedPassword) {
      this.password = password;
      this.hashedPassword = hashedPassword;

      return this.isValid;
    }
  }

  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encrypterSpy, tokenGenerateSpy);

  return {
    sut,
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGenerateSpy
  };
};

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
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    await sut.auth("any_mail@mail.com", "any_password");
    expect(loadUserByEmailRepositorySpy.email).toBe("any_mail@mail.com");
  });

  test("should throw if no LoadUserByEmailRepository is provided", async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth("any_mail@mail.com", "any_password");
    expect(promise).rejects.toThrow();
  });

  test("should throw if LoadUserByEmailRepository has no load method", async () => {
    const sut = new AuthUseCase({});
    const promise = sut.auth("any_mail@mail.com", "any_password");
    expect(promise).rejects.toThrow();
  });

  test("should return null if LoadUserByEmailRepository returns null", async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    loadUserByEmailRepositorySpy.user = null;
    const accessToken = await sut.auth("invalid_mail@mail.com", "any_password");
    expect(accessToken).toBeNull();
  });

  test("should returns null if LoadUserByEmailRepository returns null", async () => {
    const { sut, encrypterSpy } = makeSut();
    encrypterSpy.isValid = false;
    const accessToken = await sut.auth(
      "invalid_mail@mail.com",
      "invalid_password"
    );
    expect(accessToken).toBeNull();
  });

  test("should call encrypter with correct values", async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut();
    await sut.auth("invalid_mail@mail.com", "any_password");
    expect(encrypterSpy.password).toBe("any_password");
    expect(encrypterSpy.hashedpassword).toBe(
      loadUserByEmailRepositorySpy.user.password
    );
  });

  test("should call TokenGenerate with correct userId", async () => {
    const { sut, loadUserByEmailRepositorySpy, tokenGenerateSpy } = makeSut();
    await sut.auth("invalid_mail@mail.com", "valid_password");
    expect(tokenGenerateSpy.userId).toBe(loadUserByEmailRepositorySpy.user.id);
  });
});
