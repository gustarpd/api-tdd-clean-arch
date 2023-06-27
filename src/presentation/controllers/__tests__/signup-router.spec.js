import { SignUpController } from "../accounts/signup-controller.js";
import { HttpResponse } from "../../helpers/httpReponse";
import { InvalidParamError } from "../../../utils/errors/invalid-params-error";

class AddAccount {
  async add(name, email, password) {
    return { accessToken: "accessToken" };
  }
}

const makeEmailValidator = () => {
  class EmailValidator {
    isValid(email) {
      return this.isEmailValid;
    }
  }

  return new EmailValidator();
};

const makeSut = () => {
  const addAccount = new AddAccount();
  const emailValidator = makeEmailValidator();
  const signUpController = new SignUpController({ addAccount, emailValidator });

  return {
    addAccount,
    emailValidator,
    signUpController,
  };
};

describe("Signup Router", () => {
  const body = {
    name: "any_mail",
    email: "mail@mail.com",
    password: "any_password",
  };

  test("should return accessToken when calls add method", async () => {
    const { signUpController, emailValidator, addAccount } = makeSut();
    emailValidator.isEmailValid = true;
    const result = await signUpController.handle(body);
    expect(result).toHaveProperty("body");
    expect(result.body).toHaveProperty("accessToken");
    expect(result.statusCode).toBe(200);
  });

  test("should throw InternalError if route method has no any httpBody", async () => {
    const { signUpController } = makeSut();
    const result = await signUpController.handle();
    expect(result).toHaveProperty("body");
    expect(result.statusCode).toBe(500);
  });

  test("should throw MissingParamError if param name are no provided", async () => {
    const { signUpController, addAccount } = makeSut();
    addAccount.accessToken = "valid_token";
    const result = await signUpController.handle({
      email: "any_email",
      password: "any_password",
    });
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Missing param: name");
    expect(result.statusCode).toBe(400);
  });

  test("should throw MissingParamError if param email are no provided", async () => {
    const { signUpController, addAccount } = makeSut();
    addAccount.accessToken = "valid_token";
    const result = await signUpController.handle({
      name: "any_name",
      password: "any_password",
    });
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Missing param: email");
    expect(result.statusCode).toBe(400);
  });

  test("should throw MissingParamError if param password are no provided", async () => {
    const { signUpController, addAccount, emailValidator } = makeSut();
    addAccount.accessToken = "valid_token";
    emailValidator.isEmailValid = true;
    const result = await signUpController.handle({
      name: "any_mail",
      email: "mail@mail.com",
    });
    console.log(result);
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Missing param: password");
    expect(result.statusCode).toBe(400);
  });

  test("Should return 400 if email is invalid", async () => {
    const { signUpController, emailValidator } = makeSut();
    emailValidator.isEmailValid = false;
    const httpRequest = {
      name: "John Doe",
      email: "invalid_email.com",
      password: "valid_password",
    };
    const httpResponse = await signUpController.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ error: "Invalid param: email" });
  });

  test("Should return 401 if an error is thrown", async () => {
    const { signUpController, addAccount, emailValidator } = makeSut();
    emailValidator.isEmailValid = true;
    addAccount.add = () => {
      throw new Error();
    };
    const httpRequest = {
      name: "John Doe",
      email: "valid_email.com",
      password: "valid_password",
    };
    const httpResponse = await signUpController.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse).toEqual(HttpResponse.unauthorizeError());
  });
});

