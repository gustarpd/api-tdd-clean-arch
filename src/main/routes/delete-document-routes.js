import { DeleteDocumentCompose } from "../composers/delete-document-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.delete("/delete/document/:id", ExpressRouterAdapter.adapt(DeleteDocumentCompose.compose()));
};
