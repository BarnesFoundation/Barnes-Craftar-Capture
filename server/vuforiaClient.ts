import vuforia from "vuforia-api";

import { Config } from "./config";

export const VuforiaClient = vuforia.client({
  serverAccessKey: Config.vuforiaServerAccessKey,
  serverSecretKey: Config.vuforiaServerSecretKey,

  clientAccessKey: Config.vuforiaClientAccessKey,
  clientSecretKey: Config.vuforiaClientSecretKey,
});
