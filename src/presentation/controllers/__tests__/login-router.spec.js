import { LoginRouter } from "../login-controller";
import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { UnauthorizeError } from "../../helpers/errors/unauthorize-error.js";
import { ServerError } from "../../helpers/errors/server-erro.js";

const makeSut = () => {
  // classe de mock para capturar valores e fazer comparações
  const authUseCaseSpy = makeAuthUseCase();
  const emailValidatorSpy = makeEmailValidator();
  authUseCaseSpy.accessToken = "valid_token";
  const sut = new LoginRouter({
    authUseCase: authUseCaseSpy,
    emailValidator: emailValidatorSpy,
  });
  return {
    sut,
    authUseCaseSpy,
    emailValidatorSpy,
  };
};


const makeAuthUseCase = () => {
  class AuthUseCaseSpy {
    auth(email, password) {
      this.email = email;
      this.password = password;
      return this.accessToken;
    }
  }
  return new AuthUseCaseSpy();
};

const makeEmailValidator = () => {
  class EmailValidatorSpy {
    isValid(email) {
      this.email = email;
      return this.isEmailValid;
    }
  }

  const emailValidatorSpy = new EmailValidatorSpy();
  emailValidatorSpy.isEmailValid = true;
  return emailValidatorSpy;
};

const makeAuthUseCaseWithError = () => {
  class AuthUseCaseSpy {
    auth() {
      throw new Error();
    }
  }

  return new AuthUseCaseSpy();
};

const makeEmailValidatorWithError = () => {
  class EmailValidatorSpy {
    isValid() {
      throw new Error();
    }
  }

  return new EmailValidatorSpy();
};

describe("Login Router", () => {
  test("Should return 400 is no email provider", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.error).toEqual(
      new MissingParamError("email").message
    );
  });

  test("Should return 400 is no password provider", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.error).toEqual(
      new MissingParamError("password").message
    );
  });
  test("Should return 500 if no httpRequest is provider", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.route({});
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
  test("Should return 500 if has no httpRequest is provider", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.route({});
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
  test("Should call AuthUseCase with correct params", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email.com",
        password: "any_password",
      },
    };
    await sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  test("Should return 401 when invalid credentials invalid", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.accessToken = null;
    const httpRequest = {
      body: {
        email: "ivalid_email.com",
        password: "invalid_password",
      },
    };
    const httpReponse = await sut.route(httpRequest);

    expect(httpReponse.statusCode).toBe(401);
    expect(httpReponse.body.error).toEqual(
      new UnauthorizeError("password").message
    );
  });

  test("Should return 500 if no Authentication is provider", async () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: "ivalid_email.com",
        password: "invalid_password",
      },
    };
    const httpReponse = await sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(500);
  });
  test("Should return 500 if no Authentication has no auth", async () => {
    const sut = new LoginRouter({});
    const httpRequest = {
      body: {
        email: "ivalid_email.com",
        password: "invalid_password",
      },
    };
    const httpReponse = await sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(500);
    expect(httpReponse.body).toEqual(new ServerError());
  });
  test("Should return 200 when valid credentials are provided", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "valid_email.com",
        password: "valid_password",
      },
    };
    const httpReponse = await sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(200);
    expect(httpReponse.body.accessToken).toEqual(authUseCaseSpy.accessToken);
  });
  test("Should return 500 if AuthUseCase throws", async () => {
    const authCaseSpy = makeAuthUseCaseWithError();
    authCaseSpy.accessToken = "valid_token";
    const sut = new LoginRouter(authCaseSpy);
    const httpRequest = {
      body: {
        email: "valid_email.com",
        password: "valid_password",
      },
    };
    const httpReponse = await sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(500);
    expect(httpReponse.body).toEqual(new ServerError());
  });
  test("Should return 400 if an invalid email is provider", async () => {
    const authUseCaseSpy = makeAuthUseCaseWithError();
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: "invalid_email.com",
        password: "valid_password",
      },
    };
    const httpReponse = await sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(500);
    // expect(httpReponse.body).toEqual(new InvalidParamError('email'));
  });
  test("Should return 500 if an invalid emailValidator is provider", async () => {
    const authUseCaseSpy = makeAuthUseCase();
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: "invalid_email.com",
        password: "valid_password",
      },
    };
    const httpReponse = await sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(500);
    expect(httpReponse.body).toEqual(new ServerError("email"));
  });
  test("Should return 500 if an has no isValid method", async () => {
    const authUseCaseSpy = makeAuthUseCase();
    const sut = new LoginRouter(authUseCaseSpy, {});
    const httpRequest = {
      body: {
        email: "invalid_email.com",
        password: "valid_password",
      },
    };
    const httpReponse = await sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(500);
    expect(httpReponse.body).toEqual(new ServerError("email"));
  });
  test("Should return 500 if an has no isValid method", async () => {
    const authUseCaseSpy = makeAuthUseCase();
    const emailValidatorSpy = makeEmailValidatorWithError();
    const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy);

    const httpRequest = {
      body: {
        email: "invalid_email.com",
        password: "valid_password",
      },
    };
    const httpReponse = await sut.route(httpRequest);
    expect(httpReponse.statusCode).toBe(500);
    expect(httpReponse.body).toEqual(new ServerError("email"));
  });
  test("Should call emailValidator with correct email", async () => {
    const { sut, emailValidatorSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email.com",
        password: "any_password",
      },
    };
    await sut.route(httpRequest);
    expect(emailValidatorSpy.email).toBe(httpRequest.body.email);
  });

  test("Should throw if no dependency is provided", async () => {
    const suts = [].concat(
      new LoginRouter(),
      new LoginRouter({}),
      new LoginRouter({
        loadUserByEmailRepository: makeAuthUseCaseWithError(),
      }),
      new LoginRouter({
        loadUserByEmailRepository: makeAuthUseCase(),
        emailValidator: makeAuthUseCaseWithError(),
      })
    );
    for (const sut of suts) {
      const httpRequest = {
        body: {
          email: "any_email.com",
          password: "any_password",
        },
      };
      const httpResponse = await sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new ServerError());
    }
  });

  test("Should return 400 if the email is invalid", async () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;
    const httpRequest = {
      body: {
        email: "invalid_email.com",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    console.log(httpResponse)
    expect(httpResponse.statusCode).toBe(400);
    expect(emailValidatorSpy.email).toBe(httpRequest.body.email);
  });

  test("Should call AuthUseCase with correct email and password", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email.com",
        password: "any_password",
      },
    };
    await sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  test("Should return 500 if AuthUseCase throws an exception", async () => {
    const authUseCaseSpy = makeAuthUseCaseWithError();
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: "valid_email.com",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 500 if emailValidator throws an exception", async () => {
    const authUseCaseSpy = makeAuthUseCase();
    const emailValidatorSpy = makeEmailValidatorWithError();
    const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy);
    const httpRequest = {
      body: {
        email: "invalid_email.com",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError("email"));
  });

  test("Should return 500 if emailValidator is not provided", async () => {
    const authUseCaseSpy = makeAuthUseCase();
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: "invalid_email.com",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError("email"));
  });

  test("Should return 500 if authUseCase is not provided", async () => {
    const sut = new LoginRouter({});
    const httpRequest = {
      body: {
        email: "invalid_email.com",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 500 if an error is thrown", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.auth = () => {
      throw new Error();
    };
    const httpRequest = {
      body: {
        email: "valid_email.com",
        password: "valid_password",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
