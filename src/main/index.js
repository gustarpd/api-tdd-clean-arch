import { connect } from "../infra/helper/mongo-in-memory-server";
import app from "./config/app.js";

await connect().then(() => {
  app.listen(5858, () => console.log(`Server running`));
})
.catch(console.error)
