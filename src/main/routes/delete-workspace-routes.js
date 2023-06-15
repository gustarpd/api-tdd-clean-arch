import { DeleteWorkSpaceCompose } from "../composers/delete-workspace-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.delete("/workspace/task/:taskId", ExpressRouterAdapter.adapt(DeleteWorkSpaceCompose.compose()));
};
