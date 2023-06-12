import { AddWorkSpaceCompose } from '../composers/add-workspace-compose.js';
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.post("/tasks", ExpressRouterAdapter.adapt(AddWorkSpaceCompose.compose()));
};
