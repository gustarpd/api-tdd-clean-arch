import { DeleteCaseCompose } from "../composers/delete-case-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.delete("/delete/case/:id", ExpressRouterAdapter.adapt(DeleteCaseCompose.compose()));
};
