import { SignupRouterCompose } from "../composers/signup-router-compose.js"
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js'

export default (router) => {
  router.post("/signup", ExpressRouterAdapter.adapt(SignupRouterCompose.compose()));
};
