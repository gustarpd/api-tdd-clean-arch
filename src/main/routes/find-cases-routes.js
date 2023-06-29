import { FindAllCaseCompose } from "../composers/find-cases-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.get("/cases", ExpressRouterAdapter.adapt(FindAllCaseCompose.compose()));
};
