import vuforia from "vuforia-api";

import { Config } from "./config";

export const VuforiaClient = vuforia.client({
  serverAccessKey: Config.vuforiaAccessKey,
  serverSecretKey: Config.vuforiaSecretKey,
});
