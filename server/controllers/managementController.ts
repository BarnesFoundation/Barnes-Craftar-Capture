import express from "express";
import multer from "multer";

import { getNextReferenceTag } from "../utils";
import { VuforiaClient as vuforiaClient } from "../vuforiaClient";

export const uploadMiddleware = multer({ storage: multer.memoryStorage() });
export const MULTER_FIELD_NAME = "image";

type AddTargetResponseSuccess = {
  result_code: "TargetCreated";
  transaction_id: string;
  target_id: string;
};

type AddTargetResponseFailure = {
  result_code: "Fail";
  transaction_id: string;
};

class ManagementController {
  public static async addReferenceImage(
    request: express.Request,
    response: express.Response
  ) {
    const queryImage = request.file;
    const imageId = request.body.imageId as string;
    const imageBase64 = queryImage.buffer.toString("base64")

    // We need to generate a new token string that contains the original
    // Image Id, but that has an additional segment to indicate it's an
    // additional reference image for the object
    const tokenizedImageId = getNextReferenceTag(imageId);
    try {
      const addImageTargetResponse =
        await new Promise<AddTargetResponseSuccess>((resolve, reject) => {
          vuforiaClient.addTarget(
            {
              // Options to send out for the `addTarget` call
              name: tokenizedImageId,
              width: 2.0,
              image: imageBase64,
              active_flag: true,
            },
            function (
              error: AddTargetResponseFailure,
              result: AddTargetResponseSuccess
            ) {
              if (error) {
                return reject(error);
              }
              return resolve(result);
            }
          );
        });

      console.debug(
        "Successfully added the reference image as a new target into Vuforia",
        JSON.stringify(addImageTargetResponse)
      );

      return response.status(200).json({
        message: "Successfully added the reference image",
        success: true,

        item: imageId,
        uuid: addImageTargetResponse.target_id,
      });
    } catch (error) {
      console.error(
        `An error occurred adding the reference image as a new target into Vuforia`,
        error
      );

      return response.status(400).json({
        message: "Failed to add the image as a new reference image",
        success: false,

        item: imageId,
        uuid: null,
      });
    }
  }
}

export { ManagementController };
