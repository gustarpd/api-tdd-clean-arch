import express from "express";
import setup from './setup.js';

const app = express();

setup(app);

export default app;
