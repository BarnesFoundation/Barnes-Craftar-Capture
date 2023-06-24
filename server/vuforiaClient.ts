import vuforia from "vuforia-api";

import { Config } from "./config";

export interface CloudRecoQueryResponse {
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

export const VuforiaClient = vuforia.client({
  serverAccessKey: Config.vuforiaServerAccessKey,
  serverSecretKey: Config.vuforiaServerSecretKey,

  clientAccessKey: Config.vuforiaClientAccessKey,
  clientSecretKey: Config.vuforiaClientSecretKey,
});
