import { EditWorkSpacelewareRouterCompose } from "../composers/edit-workspace-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.put("/edit/:taskId", ExpressRouterAdapter.adapt(EditWorkSpacelewareRouterCompose.compose()));
};
