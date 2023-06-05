import { connect } from "../infra/helper/database.js";
import app from "./config/app.js";
import env from './config/env.js'

await connect(env.mongoUrl).then(() => {
  app.listen(5858, () => console.log(`Server running`));
})

.catch(console.error)
