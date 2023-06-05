import { LoginRouter } from '../../presentation/routers/login-router.js'
import { AuthUseCase } from '../../domain/usecases/auth-usecase.js'
import { EmailValidator } from '../../utils/email-validator.js'

export default (router) => {
  const authUseCase = new AuthUseCase()
  const emailValidator = new EmailValidator()
  const loginRouter = new LoginRouter(authUseCase, emailValidator)
  router.post("/api/login");
};
