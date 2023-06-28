import { CreateNewCaseCompose } from "../composers/create-new-case-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.post("/create/cases", ExpressRouterAdapter.adapt(CreateNewCaseCompose.compose()));
};
