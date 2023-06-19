import express from "express";

import { SearchController } from "./controllers";

export const ApiRouter = express.Router();

ApiRouter.use("/search-by-invno", SearchController.searchByInvno);
