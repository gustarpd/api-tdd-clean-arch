import { CreateCustomerCompose } from "../composers/create-new-customer-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.post("/customers", ExpressRouterAdapter.adapt(CreateCustomerCompose.compose()));
};
