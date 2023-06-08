import { AuthMiddlewareRouterCompose } from "../composers/auth-middleware-adapter";
import AuthMiddlewareAdapter from '../adapter/auth-middleware-adapter.js'

export default (router) => {
  router.post("/authentication", AuthMiddlewareAdapter.adapt(AuthMiddlewareRouterCompose.compose()));
};
