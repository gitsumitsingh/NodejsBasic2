import { Router } from "express";
import profileHandler from "./profileHandler.js";

const api = Router().use(profileHandler);
//   .use(articlesController)

export default Router().use("/api", api);
