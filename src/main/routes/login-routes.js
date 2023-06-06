import { LoginRouterCompose } from "../composer/login-router-composer.js";
import ExpressRouterAdapter from '../adapter/express-router-adapter.js'

export default (router) => {
  router.post("/api/login", ExpressRouterAdapter.adapt(LoginRouterCompose.compose()));
};
