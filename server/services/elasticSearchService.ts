import * as ElasticSearch from "elasticsearch";

import { Config } from "../config";

const esClient = new ElasticSearch.Client({
  hosts: [
    `https://${Config.esUsername}:${Config.esPassword}@${Config.esHost}:9243`,
  ],
});

interface InvnoResult {
  success: boolean;

  id: string;
  invno: string;
}

interface ImageIdResult {
  success: boolean;

  id: string;
  invno: string;
  imageSecret: string;
}

class ElasticSearchService {
  public static async searchByInvno(invno: string) {
    const elasticSearchResponse = (
      await esClient.search<InvnoResult>({
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

    return elasticSearchResponse;
  }

  public static async searchByImageId(imageId: string) {
    const elasticSearchResponse = (
      await esClient.search<ImageIdResult>({
        index: "collection",
        body: {
          size: 1,
          query: {
            bool: {
              must: {
                match: {
                  _id: imageId,
                },
              },
            },
          },
          _source: ["id", "invno", "imageSecret"],
        },
      })
    ).hits.hits;

    return elasticSearchResponse;
  }
}

export { ElasticSearchService };
