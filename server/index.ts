import express from "express";
import * as path from "path";
import { Config } from "./config";
import { ApiRouter } from "./routes";

/** Set up server constants */
const app = express();
const buildDir = path.join(__dirname, "../build");

/** Express serves the build directory */
app.use(express.static(buildDir, { index: false, etag: false }));

app.use("/api", ApiRouter);

app.use("*", (request, response) => {
  response.sendFile(path.join(buildDir, "index.html"));
});

// Only start the server when working locally
if (Config.nodeEnv === "LOCAL") {
  app.listen(Config.port, () => {
    console.log("Server running on port:", Config.port);
  });
}

export default app;
