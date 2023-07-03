import { GetAllDocumentCompose } from "../composers/get-all-document-compose.js";
import { ExpressRouterAdapter } from '../adapter/express-router-adapter.js';

export default (router) => {
  router.get("/find/all/documents", ExpressRouterAdapter.adapt(GetAllDocumentCompose.compose()));
};
