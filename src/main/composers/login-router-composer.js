import { LoginRouter } from "../../presentation/controllers/accounts/login-controller.js";
import { AuthUseCase } from "../../domain/usecases/account/auth-usecase.js";
import { EmailValidator } from "../../utils/email-validator.js";
import { LoadUserByEmailRepository } from "../../infra/repositories/load-user-by-email-repository.js";
import { UpdateAccessTokenRepository } from "../../infra/repositories/update-access-token-repository.js";
import { Encrypter } from "../../utils/encrypter.js";
import { TokenGenerator } from "../../utils/token-generator.js";
import env from "../config/env.js";

export class LoginRouterCompose {
  static compose() {
    const loadUserByEmailRepository = new LoadUserByEmailRepository();
    const updateAccessTokenRepository = new UpdateAccessTokenRepository();
    const encripter = new Encrypter();
    const tokenGenerator = new TokenGenerator(env.tokenSecret);
    const authUseCase = new AuthUseCase(
      loadUserByEmailRepository,
      encripter,
      tokenGenerator,
      updateAccessTokenRepository
    );
    const emailValidator = new EmailValidator();
    return new LoginRouter({ authUseCase, emailValidator });
  }
}
