import * as dotenv from "dotenv";

dotenv.config();

export const Config = {
    nodeEnv: process.env.NODE_ENV as "PRODUCTION" | "DEVELOPMENT" | "LOCAL",
    port: process.env.PORT,

    /** ElasticSearch environment variables */
    esHost: process.env.ES_HOST,
    esUsername: process.env.ES_USERNAME,
    esPassword: process.env.ES_PASSWORD,
};
