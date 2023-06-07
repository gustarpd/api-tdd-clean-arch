import { HttpResponse } from "../../../presentation/helpers/httpReponse";

class Decrypt {
  async decrypt(accessToken) {
    if (accessToken) {
      return {
        id: "any_id",
        name: "any_name",
      };
    }

    return HttpResponse.unauthorizeError();
  }
}

const makeDbLoadAccountBytTokenSpy = () => {
  class DbLoadAccountByTokenRepository {
    async load(access_token) {
      if(access_token) {
        return {
            name: "any_name",
            id: "any_id",
          };
      }

      return HttpResponse.unauthorizeError()
    }
  }
  return new DbLoadAccountByTokenRepository();
};

export class DbLoadAccountByToken {
  constructor(DbLoadAccountByTokenRepository, decryper) {
    this.DbLoadAccountByTokenRepository = DbLoadAccountByTokenRepository;
    this.decryper = decryper;
  }

  async loadUser(accessToken) {
    try {
      if (accessToken) {
        const decryper = await this.decryper.decrypt(accessToken);
        return decryper;
      }
    } catch (error) {
      return null;
    }

    const load = await this.DbLoadAccountByTokenRepository.load(accessToken);

    if (load) {
      return load;
    }

    return null
  }
}

const makeSut = () => {
  const loadUserByTokenlRepository = makeDbLoadAccountBytTokenSpy();
  const decryper = new Decrypt();
  const sut = new DbLoadAccountByToken(loadUserByTokenlRepository, decryper);

  return {
    sut,
    loadUserByTokenlRepository,
  };
};

describe("DBLoadAccoutByToken", () => {
  test("should decrypter token and return a user valid", async () => {
    const { sut } = makeSut();
    const user = { id: "any_id", name: "any_name" };
    const load = await sut.loadUser("any_token");
    expect(load).toEqual(user);
  });

  test("should thows if user is no authorized are no provided", async () => {
    const { sut } = makeSut();
    const load = await sut.loadUser();
    expect(load.statusCode).toBe(401)
    expect(load.body.error).toBe("unauthorized")
    expect(load).toEqual(HttpResponse.unauthorizeError())
  });
});
