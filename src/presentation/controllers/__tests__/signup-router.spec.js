import { SignUpController } from "../signup-controller";
import { HttpResponse } from "../../helpers/httpReponse";

class AddAccount {
  async add(name, email, password) {
    return "accessToken";
  }
}

class EmailValidator {
  async isValid(email) {
    return false;
  }
}

const makeSut = () => {
  const addAccount = new AddAccount();
  const emailValidator = new EmailValidator();
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
    const { signUpController, addAccount } = makeSut();
    addAccount.accessToken = "valid_token";
    const result = await signUpController.route({ body });
    expect(result).toHaveProperty("body");
    expect(result.body).toHaveProperty("accessToken");
    expect(result.statusCode).toBe(200);
  });

  test("should throw InternalError if route method has no any httpBody", async () => {
    const { signUpController } = makeSut();
    const result = await signUpController.route({});
    expect(result).toHaveProperty("body");
    expect(result.statusCode).toBe(500);
  });

  test("should throw MissingParamError if param name are no provided", async () => {
    const { signUpController, addAccount } = makeSut();
    addAccount.accessToken = "valid_token";
    const result = await signUpController.route({
      body: {
        name: "any_mail",
        password: "any_password",
      },
    });
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Missing param: email");
    expect(result.statusCode).toBe(400);
  });

  test("should throw MissingParamError if param email are no provided", async () => {
    const { signUpController, addAccount } = makeSut();
    addAccount.accessToken = "valid_token";
    const result = await signUpController.route({
      body: {
        email: "mail@mail.com",
        password: "any_password",
      },
    });
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Missing param: name");
    expect(result.statusCode).toBe(400);
  });

  test("should throw MissingParamError if param password are no provided", async () => {
    const { signUpController, addAccount } = makeSut();
    addAccount.accessToken = "valid_token";
    const result = await signUpController.route({
      body: {
        name: "any_mail",
        email: "mail@mail.com",
      },
    });
    expect(result.body).toHaveProperty("error");
    expect(result.body.error).toBe("Missing param: password");
    expect(result.statusCode).toBe(400);
  });
});
