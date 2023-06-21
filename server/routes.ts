import express from "express";

import {
  SearchController,
  ManagementController,
  uploadMiddleware,
  MULTER_FIELD_NAME,
} from "./controllers";

export const ApiRouter = express.Router();

ApiRouter.use("/search-by-invno", SearchController.searchByInvno);
ApiRouter.post(
  "/add-image",
  uploadMiddleware.single(MULTER_FIELD_NAME),
  ManagementController.addReferenceImage
);
