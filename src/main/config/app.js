import express from "express";
import setup from './setup.js';
import setupRoutes from "./routes.js";
const app = express();

setup(app);
setupRoutes(app)
export default app;
