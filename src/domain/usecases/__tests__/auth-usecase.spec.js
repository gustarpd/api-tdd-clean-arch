import { MissingParamError } from "../../../utils/errors/missing-params-error";
import { InvalidParamError } from "../../../utils/errors/invalid-params-error";
import { AuthUseCase } from "../auth-usecase";

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
const makeEncrypterWithError = () => {
  class EncypterSpy {
    async compare() {
      throw new Error();
    }
  }
  return new EncypterSpy();
};

const makeTokenGenerator = () => {
  class TokenGenerateSpy {
    async generate(userId) {
      this.userId = userId;
      return this.accessToken;
    }
  }

  const tokenGenerateSpy = new TokenGenerateSpy();
  tokenGenerateSpy.accessToken = "any_token";
  return tokenGenerateSpy;
};

const makeTokenGeneratorWithError = () => {
  class TokenGenerateSpy {
    async generate() {
      throw new Error();
    }
  }

  return new TokenGenerateSpy();
};

const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy {
    async load(email) {
      this.email = email;
      return this.user;
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  loadUserByEmailRepositorySpy.user = {
    id: "any_id",
    hashedpassword: "hashed-password",
  };

  return loadUserByEmailRepositorySpy;
};

const makeLoadUserByEmailRepositoryWithError = () => {
  class LoadUserByEmailRepositorySpy {
    async load() {
      throw new Error();
    }
  }

  return new LoadUserByEmailRepositorySpy();
};

const makeUpdateAccessTokenRepository = () => {
  class UpdateAccessTokenRepository {
    async update(userId, access_token) {
      (this.userId = userId), (this.accessToken = access_token);
    }
  }

  return new UpdateAccessTokenRepository();
};

const makeSut = () => {
  const encrypterSpy = makeEncrypter();
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy();
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository();
  const tokenGenerateSpy = makeTokenGenerator();
  class EncypterSpy {
    async compare(password, hashedPassword) {
      this.password = password;
      this.hashedPassword = hashedPassword;

      return this.isValid;
    }
  }

  const sut = new AuthUseCase(
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGenerateSpy,
    updateAccessTokenRepositorySpy
  );

  return {
    sut,
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGenerateSpy,
    updateAccessTokenRepositorySpy,
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
    const { sut, encrypterSpy, loadUserByEmailRepositorySpy } = makeSut();
    encrypterSpy.isValid = false;
    loadUserByEmailRepositorySpy.user = null;
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

  test("should return an accessToken if correct credencials are provided", async () => {
    const { sut, tokenGenerateSpy } = makeSut();
    const accessToken = await sut.auth(
      "invalid_mail@mail.com",
      "valid_password"
    );
    expect(accessToken).toBe(tokenGenerateSpy.accessToken);
    expect(accessToken).toBeTruthy();
  });

  test("Should throw if no dependency is provided", async () => {
    const loadUserByEmailRepository = makeLoadUserByEmailRepositorySpy();
    const encrypter = makeEncrypter();
    const tokenGenerator = makeTokenGenerator()
    const suts = [].concat(
      new AuthUseCase(),
      new AuthUseCase({}),
      new AuthUseCase({
        loadUserByEmailRepository: {},
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypterSpy: null,
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypterSpy: {},
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerateSpy: null,
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerateSpy: {},
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerateSpy: null,
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerateSpy: makeTokenGenerator(),
        UpdateAccessTokenRepository: null,
      
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerateSpy: makeTokenGenerator(),
        UpdateAccessTokenRepository: {},
      })
    );

    for (const sut of suts) {
      const promise = sut.auth("any_mail@mail.com", "any_password");
      expect(promise).rejects.toThrow();
    }
  });
  test("Should throw if dependency thows", async () => {
    const encrypter = makeEncrypter();
    const loadUserByEmailRepository = makeLoadUserByEmailRepositorySpy();
    const suts = [].concat(
      new AuthUseCase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositoryWithError(),
        encrypter,
      }),
      new AuthUseCase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositoryWithError(),
        encrypter: makeEncrypterWithError(),
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerate: makeTokenGeneratorWithError(),
      })
    );

    for (const sut of suts) {
      const promise = sut.auth("any_mail@mail.com", "any_password");
      expect(promise).rejects.toThrow();
    }
  });

  test("should call updateAccessTokenRepository with correct values", async () => {
    const {
      sut,
      loadUserByEmailRepositorySpy,
      updateAccessTokenRepositorySpy,
      tokenGenerateSpy,
    } = makeSut();
    await sut.auth("invalid_mail@mail.com", "valid_password");
    expect(updateAccessTokenRepositorySpy.userId).toBe(
      loadUserByEmailRepositorySpy.user.id
    );
    expect(updateAccessTokenRepositorySpy.accessToken).toBe(
      tokenGenerateSpy.accessToken
    );
  });
});
