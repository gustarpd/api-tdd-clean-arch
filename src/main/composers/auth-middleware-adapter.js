import { AuthMiddleware } from '../../presentation/middleware/auth-middleware'
import { LoadUserByTokenlRepository } from '../../infra/repositories/loadAccountByToken'

export class LoginRouterCompose {
  static compose() {
    const loadAccountByToken = new LoadUserByTokenlRepository()
    return new AuthMiddleware({ authUseCase, emailValidator });
  }
}
