import { AppDataSource } from "src/infra/database/data-source";
import fs from "fs";
import path from "path";

AppDataSource.initialize()
  .then(async () => {
    const [type, exec] = process.argv.slice(2);
    const basePath = path.join(__dirname, "commands");
    const file = path.join(basePath, `${exec}.ts`);

    switch (type) {
      case "--function":
      case "-fn":
        if (file && fs.existsSync(file)) {
          import(file).then(async (fn) => {
            const res = await fn.execute();

            console.log(res);
          });
        }
        break;
    }
  })
  .catch((err: any) => {
    throw err;
  });
