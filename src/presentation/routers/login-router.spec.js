import { LoginRouter } from "./login-router";
import { MissingParamError } from "../helpers/missing-param-error";

const makeSut = () => {
  // classe de mock para capturar valores e fazer comparações  
  class AuthUseCaseSpy {
    auth(email, password) {
      this.email = email;
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy();
  const sut = new LoginRouter(authUseCaseSpy);
  return {
    sut,
    authUseCase: authUseCaseSpy,
  };
};

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
  });
  test("Should return 500 if has no httpRequest is provider", () => {
    const { sut } = makeSut();
    const httpResponse = sut.route({});
    expect(httpResponse.statusCode).toBe(500);
  });
  test("Should call AuthUseCase with correct params", () => {
    const { sut, authUseCase } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email.com",
        password: "any_password",
      },
    };
    sut.route(httpRequest);
    expect(authUseCase.email).toBe(httpRequest.body.email);
    expect(authUseCase.password).toBe(httpRequest.body.password);
  });
});
