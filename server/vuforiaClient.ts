import vuforia from "vuforia-api";

import { Config } from "./config";

export interface CloudRecoQueryResponse {
  query_id: string;
  results: Array<{
    target_id: string;
    // The `target_data` field is only provided in the top result
    // This is because the Vuforia client does not allow us to indicate that
    // we would like ALL results to include the `target_data` field
    target_data?: {
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
