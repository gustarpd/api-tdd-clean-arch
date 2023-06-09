import { ExpressRouterAdapter } from "../adapter/auth-middleware-adapter.js";
import { AuthMiddlewareRouterCompose } from '../composers/auth-middleware-adapter.js'

export const auth = ExpressRouterAdapter.adapt(AuthMiddlewareRouterCompose.compose())