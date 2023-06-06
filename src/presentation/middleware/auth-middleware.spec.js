import { UnauthorizeError } from "../helpers/errors/unauthorize-error";
import { HttpResponse } from "../helpers/httpReponse";

const makeLoadAccountByToken = () => {
  class LoadAccountByToken {
    async load(accessToken) {
      this.accessToken = accessToken;
      this.user
      return this.user;
    }
  }

  const makeLoadAccountByTokenSpy = new LoadAccountByToken();
  makeLoadAccountByTokenSpy.user = {
    id: 'any_id',
  };
  return makeLoadAccountByTokenSpy;
};

const makeLoadAccountByTokenWithInvalidToken = () => {
  class LoadAccountByToken {
    async load(accessToken) {
      this.accessToken = accessToken;
      if (!accessToken) {
        throw new HttpResponse.unauthorizeError();
      }
      return this.user;
    }
  }

  const makeLoadAccountByTokenSpy = new LoadAccountByToken();
  makeLoadAccountByTokenSpy.accessToken = null;
  return makeLoadAccountByTokenSpy;
};

class AuthMiddleware {
  constructor(loadAccountByToken) {
    this.loadAccountByToken = loadAccountByToken;
  }

  async handle(request) {
    const accessToken = request;
    if (!accessToken) {
      throw HttpResponse.unauthorizeError()
    }
    const account = await this.loadAccountByToken.load(accessToken);
    if (account) {
      return HttpResponse.ok({ accountId: account.id });
    }
  }
}

const makeSut = () => {
  const loadAccountByToken = makeLoadAccountByToken();
  const loadUserWithError = makeLoadAccountByTokenWithInvalidToken()
  const authMiddleware = new AuthMiddleware(loadAccountByToken);

  return {
    authMiddleware,
    loadAccountByToken,
    loadUserWithError
  };
};

describe("Auth Middleware", () => {
  test("should return a valid token when LoadAccountByToken is invoked", async () => {
    const { loadAccountByToken } = makeSut();
    const validToken = "valid_token";
    await loadAccountByToken.load(validToken);
    expect(loadAccountByToken.accessToken).toBe(validToken);
  });
  test("should return valid credencials if accessToken are no provided", async () => {
    const { authMiddleware } = makeSut()
    const auth = await authMiddleware.handle('any_token')
    console.log(auth)
    await expect(auth.statusCode).toBe(200)
  })
});
