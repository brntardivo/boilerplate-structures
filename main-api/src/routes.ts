import { Express } from "express";
import fs from "fs";
import path from "path";

const register = (app: Express): void => {
  try {
    const basePath = path.join(__dirname, "domains");

    const domains = fs.readdirSync(basePath);

    for (const domain of domains) {
      const domainPath = path.join(basePath, domain);
      const modules = fs.readdirSync(domainPath);

      for (const mod of modules) {
        const routerFile = path.join(domainPath, mod, "routes.ts");

        if (routerFile && fs.existsSync(routerFile)) {
          const prefix = `/${domain}/${mod}`;

          import(routerFile).then((routes) => {
            app.use(prefix, routes.router);
          });
        }
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

export default { register };
