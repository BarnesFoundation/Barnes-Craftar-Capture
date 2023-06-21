import express from "express";
import * as ElasticSearch from "elasticsearch";

import { Config } from "../config";
import { VuforiaClient as vuforiaClient } from "../vuforiaClient";

interface ElasticSearchSource {
  success: boolean;
  id: string;
  invno: string;
}

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

const esClient = new ElasticSearch.Client({
  hosts: [
    `https://${Config.esUsername}:${Config.esPassword}@${Config.esHost}:9243`,
  ],
});

class SearchController {
  public static async searchByInvno(
    request: express.Request,
    response: express.Response
  ) {
    const invno = request.query.invno;
    const elasticSearchResponse = (
      await esClient.search({
        index: "collection",
        body: {
          size: 1,
          query: {
            bool: {
              must: {
                match: {
                  invno: invno,
                },
              },
            },
          },
          _source: ["id", "invno"],
        },
      })
    ).hits.hits;

    // If there's a valid response from ElasticSearch, then we have a usable ID
    if (elasticSearchResponse.length > 0) {
      const { id } = elasticSearchResponse[0]._source as ElasticSearchSource;
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
}

export { SearchController };
