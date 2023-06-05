import { Router } from 'express';
import fg from 'fast-glob';

export default (app) => {
  const router = Router();
  app.use('/api', router);
  fg.sync('**/src/main/routes/**routes.js').forEach(async (file) => {
    const { default: route } = await import(`../../../${file}`);
    route(router);
  });
};
