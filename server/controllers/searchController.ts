import express from "express";
import axios from "axios";

import { Config } from "../config";
import { REF_TAG } from "../utils";
import { VuforiaClient as vuforiaClient } from "../vuforiaClient";
import { ElasticSearchService } from "../services";

interface VuforiaResponse {
  query_id: string;
  results: Array<{
    target_id: string;
    target_data: {
      name: string;
      application_metadata: string;
      target_timestamp: number;
    };
  }>;
  result_code: string;
}

class SearchController {
  public static async searchByInvno(
    request: express.Request,
    response: express.Response
  ) {
    const invno = request.query.invno;
    const elasticSearchResponse = await ElasticSearchService.searchByInvno(
      invno
    );

    // If there's a valid response from ElasticSearch, then we have a usable ID
    if (elasticSearchResponse.length > 0) {
      const { id } = elasticSearchResponse[0]._source;
      return response.status(200).json({
        id,
        success: true,
      });
    }

    // Otherwise, no identified record in ElasticSearch for this invno
    return response.status(404).json({
      id: null,
      success: false,
    });
  }

  public static async searchByImage(
    request: express.Request,
    response: express.Response
  ) {
    const queryImage = request.file;
    const imageBinary = queryImage.buffer.toString("binary");

    try {
      const imageSearchResult = await new Promise<VuforiaResponse>(
        (resolve, reject) => {
          vuforiaClient.cloudRecoQuery(
            imageBinary,
            5,
            function (error, result) {
              if (error) {
                return reject(error);
              } else {
                return resolve(result);
              }
            }
          );
        }
      );

      console.log(
        "Successful Vuforia API image search result",
        JSON.stringify(imageSearchResult)
      );

      // Transform the result into a format similar to how CraftAR was providing us
      // so that we can continue to utilize the FE as-is without any changes for now
      const transformedResult = {
        search_time: Date.now(),
        results: imageSearchResult.results
          // Not sure why some items in this list come back with no `target_data` key
          // If there is no `target_data` key then we don't get a `name` value
          .filter((result) => result.target_id && result.target_data)
          .map((result) => ({
            item: {
              name: result.target_data?.name,
            },
            image: {
              thumb_120: "null",
            },
          })),
      };

      return response.status(200).json(transformedResult);
    } catch (error) {
      console.log(`An error occurred sending request to Vueforia`, error);
      return response.status(500).json({
        message: "An error occurrend sending performing image search request",
      });
    }
  }

  public static async searchByImageId(
    request: express.Request,
    response: express.Response
  ) {
    const imageId = request.query.imageId as string;

    try {
      // Get the Vuforia ID of this image identifier
      const imageTargetResult = await SearchController.resolveTargetForImageId(
        imageId
      );

      if (imageTargetResult === null) {
        return response.status(400).json({
          message: "Could not find associated target for the provided Image ID",
          success: false,
        });
      }

      return response.status(200).json({
        message:
          "Successfully retrieved associated target for the provided Image ID",
        success: true,

        name: imageTargetResult.name,
        uuid: imageTargetResult.uuid,
        imageUrl: imageTargetResult.imageUrl,
      });
    } catch (error) {
      console.error(
        `An error occurred retrieved targets from the Vuforia database`,
        error
      );

      return response.status(400).json({
        message:
          "Failed to retrieve associated target for the provided Image ID",
        success: false,
      });
    }
  }

  private static async resolveTargetForImageId(imageId: string) {
    // When we receive an Image ID, there's no way to directly relate this back to the
    // associated image target in Vuforia. For example, for an Image ID 6726, we can't query
    // Vuforia's Web API to return to us the image target(s) associated with this specific ID.
    // There's no ability to providie a specific field to their List Targets API to retrieve a specific
    // image target associated with the Image ID 6726. So we have to look up the origina reference image
    // and provide that to Vuforia to then have it provide us with the right image target
    const elasticSearchResponse = await ElasticSearchService.searchByImageId(
      imageId
    );

    // This means no match found for the provided ID
    if (elasticSearchResponse.length === 0) {
      return null;
    }

    // We have a match for this image id. We can build the S3 URL
    const { imageSecret } = elasticSearchResponse[0]._source;
    const objectImageUrl = `https://${Config.imageHost}/${imageId}_${imageSecret}_b.jpg`;

    // Download the image
    const response = await axios({
      method: "get",
      url: objectImageUrl,
      responseType: "arraybuffer",
    });
    const imageBinary = Buffer.from(response.data).toString("binary");

    // Get the matching image target from Vuforia
    const imageSearchResult = await new Promise<VuforiaResponse>(
      (resolve, reject) => {
        vuforiaClient.cloudRecoQuery(imageBinary, 5, function (error, result) {
          if (error) {
            return reject(error);
          } else {
            return resolve(result);
          }
        });
      }
    );

    // This means no match found in Vuforia
    if (imageSearchResult.results.length === 0) {
      return null;
    }

    // if we have more than 1 possible result in Vuforia after filtering - we shouldn't rely on this
    // Filter out the additional reference image results
    const filteredImageResults = imageSearchResult.results.filter((item) => {
      return item.target_data.name.includes(REF_TAG) === false;
    });
    if (filteredImageResults.length > 1) {
      return null;
    }

    const identifiedTarget = filteredImageResults[0];
    return {
      name: identifiedTarget.target_data.name,
      uuid: identifiedTarget.target_id,

      // Smaller image URL for mobile
      imageUrl: `https://${Config.imageHost}/${imageId}_${imageSecret}_n.jpg`,
    };
  }
}

export { SearchController };
