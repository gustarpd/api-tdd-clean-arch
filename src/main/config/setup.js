import corsMiddleware from "../middlewares/cors.js";
import jsonParserMiddleware from "../middlewares/json-parser.js";
import contentType from "../middlewares/content-type.js";

export default (app) => {
  app.disable("x-powered-by");
  app.use(corsMiddleware)
  app.use(jsonParserMiddleware)
  app.use(contentType)
};
