import { GetTaskWorkSpaceCompose } from "../composers/get-tasks-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.get("/workspace/tasks", ExpressRouterAdapter.adapt(GetTaskWorkSpaceCompose.compose()));
};
