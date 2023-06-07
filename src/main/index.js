import { connect } from "../infra/db/database.js";
import app from "./config/app.js";
import env from './config/env.js'

connect(env.mongoUrl).then(() => {
  app.listen(env.port, () => console.log(`Server running at localhost://${env.port}`));
})

.catch(console.error)

