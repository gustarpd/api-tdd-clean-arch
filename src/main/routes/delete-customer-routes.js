import { deleteCustomerCompose } from "../composers/delete-customer-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.delete("/delete/customer/:id", ExpressRouterAdapter.adapt(deleteCustomerCompose.compose()));
};
