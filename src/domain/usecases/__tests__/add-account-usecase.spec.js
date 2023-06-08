import e from "express";
import { MissingParamError } from "../../../utils/errors/missing-params-error";

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
      return "hash";
    }
  }

  return new Hasher();
};

class AddAccount {
  constructor(AddAccountRepository, hasher) {
    (this.AddAccountRepository = AddAccountRepository), (this.hasher = hasher);
  }
  async add(name, email, password) {
    if ((name, email, password)) {
      const hashPassword = await this.hasher.hash(password, 12);
      const user = await this.AddAccountRepository.add({
        name,
        email,
        hashPassword,
      });
      return user;
    } else {
      throw new MissingParamError("missing values");
    }
  }
}

const makeSut = () => {
  const addAccountRepository = makeAddAccountRespositorySpy();
  const hasherSpy = makeHasherSpy();
  const sut = new AddAccount(addAccountRepository, hasherSpy);

  return {
    sut,
  };
};

describe("AddAccount UseCase", () => {
  test("should add an account if AddAcout has correct values", async () => {
    const { sut } = makeSut();
    const result = await sut.add("any_name", "any_mail", "any_password");
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
  });
});
