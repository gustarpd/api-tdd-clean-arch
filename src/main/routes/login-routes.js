import { LoginRouterCompose } from "../composers/login-router-composer.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js'
import { auth } from "../config/auth.js";

export default (router) => {
  router.post("/login", ExpressRouterAdapter.adapt(LoginRouterCompose.compose()));
};
