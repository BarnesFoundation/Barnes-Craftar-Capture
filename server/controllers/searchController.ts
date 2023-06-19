import express from "express";
import * as ElasticSearch from "elasticsearch";

import { Config } from "../config";

interface ElasticSearchSource {
  success: boolean;
  id: string;
  invno: string;
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
}

export { SearchController };
