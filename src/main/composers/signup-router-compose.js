import { EmailValidator } from "../../utils/email-validator.js";
import { AddAccountRepository } from "../../infra/repositories/add-account-repository.js";
import { Encrypter } from "../../utils/encrypter.js";
import { AddAccount } from "../../domain/usecases/add-account-usecase.js";
import { SignUpController } from "../../presentation/controllers/signup-controller.js";
import { TokenGenerator } from "../../utils/token-generator.js";
import env from "../config/env.js";

export class SignupRouterCompose {
  static compose() {
    const addAccountRepository = new AddAccountRepository()
    const encripter = new Encrypter()
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const addAccount = new AddAccount(addAccountRepository, encripter, tokenGenerator)
    const emailValidator = new EmailValidator()
    return new SignUpController({ addAccount, emailValidator });
   
  }
}
