const testFolder = "./build/solc/";
const fs = require("fs");
const path = require("path");

fs.readdir(testFolder, (err, files) => {
  files.forEach((file) => {
    const filepath = path.join(testFolder, file);
    if (path.extname(file) === ".bin") {
      const data = fs.readFileSync(filepath);
      fs.writeFileSync(
        `${path.join(testFolder, path.basename(file, path.extname(file)))}.bin.json`,
        `["${data}"]`
      );
      fs.unlinkSync(filepath);
    } else {
      fs.renameSync(
        filepath,
        path.join(testFolder, `${path.basename(file, path.extname(file))}.abi.json`)
      );
    }
  });
});
