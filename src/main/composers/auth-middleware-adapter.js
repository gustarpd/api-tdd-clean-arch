import { DbLoadAccountByToken } from '../../domain/usecases/dbload-account-by-token.js'
import { AuthMiddleware } from '../../presentation/middleware/auth-middleware.js'

export class AuthMiddlewareRouterCompose {
  static compose() {
    const makeDbBytoken = new DbLoadAccountByToken()
    return new AuthMiddleware(makeDbBytoken)
  }
}
