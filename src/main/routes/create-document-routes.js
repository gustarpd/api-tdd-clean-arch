import { AddDocumentCompose } from "../composers/add-document-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.post("/create/documents", ExpressRouterAdapter.adapt(AddDocumentCompose.compose()));
};
