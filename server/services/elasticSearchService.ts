import * as ElasticSearch from "elasticsearch";

import { Config } from "../config";

const esClient = new ElasticSearch.Client({
  hosts: [
    `https://${Config.esUsername}:${Config.esPassword}@${Config.esHost}:9243`,
  ],
});

interface ElasticSearchSource {
  success: boolean;
  id: string;
  invno: string;
}

class ElasticSearchService {
  public static async searchByInvno(invno: string) {
    const elasticSearchResponse = (
      await esClient.search<ElasticSearchSource>({
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
}

export { ElasticSearchService };
