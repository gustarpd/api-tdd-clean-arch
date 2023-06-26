import { FindAllCustomerCustomerCompose } from "../composers/find-all-customers-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.get("/customer/all", ExpressRouterAdapter.adapt(FindAllCustomerCustomerCompose.compose()));
};
