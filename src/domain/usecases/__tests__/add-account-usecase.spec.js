import { MissingParamError } from "../../../utils/errors/missing-params-error";
import { AddAccount } from "../account/add-account-usecase.js";
import { TokenGenerator } from "../../../utils/token-generator";
import env from "../../../main/config/env";
import { HttpResponse } from "../../../presentation/helpers/httpReponse";

const makeAddAccountRespositorySpy = () => {
  class AddAccountRepository {
    async add(name, email, password) {
      (this.name = name), (this.email = email), (this.password = password);
      return this.user;
    }
  }

  const addAccountRepository = new AddAccountRepository();
  addAccountRepository.user = {
    name: "any_name",
    email: "any_email",
    password: "any_password",
  };
  return addAccountRepository;
};

const makeHasherSpy = () => {
  class Hasher {
    async hash(password, salt) {
      this.password = password;
      this.salt = salt;
      return this.value;
    }
  }

  const hasherSpy = new Hasher();
  hasherSpy.value = "hash";
  return hasherSpy;
};

const makeHasherWithErrorSpy = () => {
  class Hasher {
    async hash() {
      throw new Error("Hasher failed");
    }
  }

  return new Hasher();
};

const makeAddAccountRespositoryWithErrorSpy = () => {
  class AddAccountRepository {
    async add() {
      return null;
    }
  }

  const addAccountRepository = new AddAccountRepository();
  addAccountRepository.user = {
    name: "any_name",
    email: "any_email",
    password: "any_password",
  };
  return addAccountRepository;
};

const makeSut = () => {
  const addAccountRepository = makeAddAccountRespositorySpy();
  const hasherSpy = makeHasherSpy();
  const tokenGenerate = new TokenGenerator(env.tokenSecret);
  const sut = new AddAccount(addAccountRepository, hasherSpy, tokenGenerate);

  return {
    sut,
    hasherSpy,
    addAccountRepository,
  };
};

describe("AddAccount UseCase", () => {
  test.skip("should add an account with correct values", async () => {
    const { sut } = makeSut();
    const result = await sut.add("any_name", "any_mail", "any_password");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("password");
  });

  test("should add an account with correct values", async () => {
    const { sut } = makeSut();
    const result = sut.add("any_password");
    expect(result).rejects.toThrow(new MissingParamError("missing values"));
  });

  test("should throws Internal Error if hasher is failed", async () => {
    const repository = makeAddAccountRespositorySpy();
    const hashed = makeHasherWithErrorSpy();
    const sut = new AddAccount(repository, hashed);
    const result = sut.add("any_name", "any_mail", "any_password");
    expect(result).rejects.toThrowError(new Error("Hasher failed"));
  });

  test("should throws Internal Error if repository failed", async () => {
    const repository = makeAddAccountRespositoryWithErrorSpy();
    const hashed = makeHasherSpy();
    const sut = new AddAccount(repository, hashed);
    const result = await sut.add("any_name", "any_mail", "any_password");
    await expect(result).toBeNull();
  });

  test("should throws Internal Error if repository failed", async () => {
    const { hasherSpy, addAccountRepository } = makeSut();
    hasherSpy.value = null;
    const sut = new AddAccount(addAccountRepository, hasherSpy);
    await expect(
      async () => await sut.add("any_name", "any_mail", "any_password")
    ).rejects.toEqual(HttpResponse.InternalError("Internal Error", 500));
  });
});
