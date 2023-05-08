import { LoginRouter } from "./login-router";
import { MissingParamError } from "../helpers/missing-param-error";
import { UnauthorizeError } from "../helpers/unauthorize-error";
import { ServerError } from "../helpers/server-erro";

const makeSut = () => {
  // classe de mock para capturar valores e fazer comparações
  const authUseCaseSpy = makeAuthUseCase();
  authUseCaseSpy.accessToken = 'valid_token'
  const sut = new LoginRouter(authUseCaseSpy);
  return {
    sut,
    authUseCaseSpy,
  };
};

const makeAuthUseCase = () => {
  class AuthUseCaseSpy {
    auth(email, password) {
      this.email = email;
      this.password = password;
      return this.accessToken 
    }
  }
  return new AuthUseCaseSpy()
}

const makeAuthUseCaseWithError = () => {
  class AuthUseCaseSpy {
    auth() {
        throw new Error()
    }
  }

  return new AuthUseCaseSpy()
}

describe("", () => {
  test("Should return 400 is no email provider", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 is no password provider", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });
  test("Should return 500 if no httpRequest is provider", () => {
    const { sut } = makeSut();
    const httpResponse = sut.route({});
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());

  });
  test("Should return 500 if has no httpRequest is provider", () => {
    const { sut } = makeSut();
    const httpResponse = sut.route({});
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
  test("Should call AuthUseCase with correct params", () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email.com",
        password: "any_password",
      },
    };
    sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  test("Should return 401 when invalid credentials invalid", () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.accessToken = null
    const httpRequest = {
      body: {
        email: "ivalid_email.com",
        password: "invalid_password",
      },
    };
    const httpReponse = sut.route(httpRequest);

    expect(httpReponse.statusCode).toBe(401);
    expect(httpReponse.body).toEqual(new UnauthorizeError("password"));
  });

  test("Should return 500 if no Authentication is provider", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: "ivalid_email.com",
        password: "invalid_password",
      },
    };
    const httpReponse = sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(500);
  });
  test("Should return 500 if no Authentication has no auth", () => {
    const sut = new LoginRouter({});
    const httpRequest = {
      body: {
        email: "ivalid_email.com",
        password: "invalid_password",
      },
    };
    const httpReponse = sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(500);
    expect(httpReponse.body).toEqual(new ServerError())
  });
  test("Should return 200 when valid credentials are provided", () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "valid_email.com",
        password: "valid_password",
      },
    };
    const httpReponse = sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(200)
    expect(httpReponse.body.accessToken).toEqual(authUseCaseSpy.accessToken);
  });
  test("Should return 500 if AuthUseCase throws", () => {
    const authCaseSpy = makeAuthUseCaseWithError()
    authCaseSpy.accessToken = 'valid_token'
    const sut = new LoginRouter(authCaseSpy)
    const httpRequest = {
      body: {
        email: "valid_email.com",
        password: "valid_password",
      },
    };
    const httpReponse = sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(500)
    expect(httpReponse.body).toEqual(new ServerError());
  });
});
