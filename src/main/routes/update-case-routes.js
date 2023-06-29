import { UpdateCaseCompose } from "../composers/update-case-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.put("/update/case/:id", ExpressRouterAdapter.adapt(UpdateCaseCompose.compose()));
};
