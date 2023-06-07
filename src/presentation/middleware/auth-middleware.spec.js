import { UnauthorizeError } from "../helpers/errors/unauthorize-error";
import { HttpResponse } from "../helpers/httpReponse";

const makeLoadAccountByToken = () => {
  class LoadAccountByToken {
    async load(accessToken) {
      this.accessToken = accessToken;
      this.user = {
        id: "any_id",
      };
      return this.user;
    }
  }

  const makeLoadAccountByTokenSpy = new LoadAccountByToken();
  return makeLoadAccountByTokenSpy;
};

const makeLoadAccountByTokenWithInvalidToken = () => {
  class LoadAccountByToken {
    async load(accessToken) {
      this.accessToken = accessToken;
      if (!accessToken) {
        throw new Error();
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
      throw new Error()
    }
    const account = await this.loadAccountByToken.load(accessToken);
    if (account) {
      return HttpResponse.ok({ accountId: account.id });
    }
  }
}

const makeSut = () => {
  const loadAccountByToken = makeLoadAccountByToken();
  const loadUserWithError = makeLoadAccountByTokenWithInvalidToken();
  const authMiddleware = new AuthMiddleware(loadAccountByToken);

  return {
    authMiddleware,
    loadAccountByToken,
    loadUserWithError,
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
    const { authMiddleware } = makeSut();
    const auth = await authMiddleware.handle("any_valid_token");
    const authResponse = { statusCode: 200, body: { accountId: "any_id" } };
    await expect(auth).toEqual(authResponse);
  });
  test("should throw an error if token is not provided", async () => {
    const { authMiddleware } = makeSut();
    const auth = authMiddleware.handle()
    await expect(auth).rejects.toThrow();
  });
  test("should throw an error if token is not provided", async () => {
    const { loadUserWithError } = makeSut();
    await expect(loadUserWithError.load()).rejects.toThrow();
  });
});
