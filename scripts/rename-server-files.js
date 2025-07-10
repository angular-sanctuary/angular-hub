const fs = require("fs");
const path = require("path");

const serverDir = "./dist/angular-hub/server";
const files = fs.readdirSync(serverDir);

files.forEach((file) => {
  if (file.includes(".server.")) {
    const newName = file.replace(".server.", "-server.");
    fs.renameSync(path.join(serverDir, file), path.join(serverDir, newName));
  }
});
