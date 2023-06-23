import express from "express";

import {
  SearchController,
  ManagementController,
  uploadMiddleware,
  MULTER_FIELD_NAME,
} from "./controllers";

export const ApiRouter = express.Router();

// Search Endpoints
ApiRouter.use("/search-by-invno", SearchController.searchByInvno);
ApiRouter.get("/search-by-image-id", SearchController.searchByItemId);
ApiRouter.post(
  "/search-by-image",
  uploadMiddleware.single(MULTER_FIELD_NAME),
  SearchController.searchByImage
);

// Management endpoints
ApiRouter.post(
  "/add-image",
  uploadMiddleware.single(MULTER_FIELD_NAME),
  ManagementController.addReferenceImage
);
