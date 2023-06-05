import { Router } from 'express';
import fb from 'fast-glob'

export default (app) => {
  app.use('/api', Router)
  fb.sync('**/src/main/routes/**.js').forEach(file => console.log(file))
  // import('../routes/login-routes')(Router)
};
