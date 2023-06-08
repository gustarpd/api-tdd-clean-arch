import { AuthMiddleware } from '../../presentation/middleware/auth-middleware'

export class AuthMiddlewareRouterCompose {
  static compose() {
    const loadAccountByToken = new LoadUserByTokenlRepositor()
    return new AuthMiddleware(loadAccountByToken);
  }
}
