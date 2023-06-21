import * as dotenv from "dotenv";

dotenv.config();

export const Config = {
  nodeEnv: process.env.NODE_ENV as "PRODUCTION" | "DEVELOPMENT" | "LOCAL",
  port: process.env.PORT,

  /** ElasticSearch environment variables */
  esHost: process.env.ES_HOST,
  esUsername: process.env.ES_USERNAME,
  esPassword: process.env.ES_PASSWORD,

  /** Vuforia API Credentials */
  vuforiaServerAccessKey: process.env.VUFORIA_SERVER_ACCESS_KEY,
  vuforiaServerSecretKey: process.env.VUFORIA_SERVER_SECRET_KEY,

  vuforiaClientAccessKey: process.env.VUFORIA_CLIENT_ACCESS_KEY,
  vuforiaClientSecretKey: process.env.VUFORIA_CLIENT_SECRET_KEY,
};
