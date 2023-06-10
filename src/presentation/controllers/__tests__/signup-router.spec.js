import { SignUpController } from "../signup-controller";

class AddAccount {
  async add(name, email, password) {
    return 'accessToken'
  }
}

class EmailValidator {
  async isValid(email) {
    return true
  }
}

const makeSut = () => {
  const addAccount = new AddAccount();
  const emailValidator = new EmailValidator();
  const signUpController = new SignUpController({ addAccount, emailValidator });

  return {
   addAccount,
   emailValidator,
   signUpController
  }
};

describe("Signup Router", () => {
  const body = {
    name: "any_mail",
    email: "mail@mail.com",
    password: "any_password"
  }
  test("should return accessToken when calls add method", async () => {
    const { signUpController, addAccount } = makeSut()
    addAccount.accessToken = 'valid_token'
    const result = await signUpController.route({ body })
    expect(result).toHaveProperty("body")
    expect(result.body).toHaveProperty("accessToken")
    expect(result.statusCode).toBe(200)
  });
});
