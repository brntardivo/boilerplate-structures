import { Express } from "express";
import fs from "fs";

const register = (app: Express): void => {
  try {
    fs.readdirSync(`${__dirname}/../routes/client`).map(async (file) => {
      if (!file.includes(".test.") && !file.endsWith(".map")) {
        import(`../routes/client/${file}/routes.ts`).then((routes) => {
          app.use(routes.prefix, routes.router);
        });
      }
    });

    fs.readdirSync(`${__dirname}/../routes/management`).map(async (file) => {
      if (!file.includes(".test.") && !file.endsWith(".map")) {
        import(`../routes/management/${file}/routes.ts`).then((routes) => {
          app.use(routes.prefix, routes.router);
        });
      }
    });
  } catch (err) {
    console.warn(err);
  }
};

export default { register };
