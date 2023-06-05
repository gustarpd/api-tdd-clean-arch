import cors from "../middlewares/cors";
import express from 'express'
import jsonParser from "../middlewares/json-parser";

export default (app) => {
  app.disable("x-powered-by");
  app.use(cors)
  app.use(jsonParser)
};
