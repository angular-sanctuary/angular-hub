const path = require("path");

const serverDistPath = path.join(
  process.cwd(),
  "dist/angular-hub/server/server.mjs",
);

export default import(serverDistPath).then((module) => module.reqHandler);
