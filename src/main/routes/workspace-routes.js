import { AddWorkSpaceCompose } from '../composers/add-workspace-compose.js';
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';
import { auth } from '../config/auth.js';

export default (router) => {
  router.post("/tasks", ExpressRouterAdapter.adapt(AddWorkSpaceCompose.compose()));
};
