import { UpdateCustomerCompose } from "../composers/update-customer-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.put("/customer/update/:id", ExpressRouterAdapter.adapt(UpdateCustomerCompose.compose()));
};
