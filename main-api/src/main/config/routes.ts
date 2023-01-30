import { Express } from 'express';
import fs from 'fs';
import path from 'path';

const register = (app: Express): void => {
  try {
    const basePath: string = path.join(__dirname, '../../', 'modules');
    const modules: string[] = fs.readdirSync(basePath);
    for (const mod of modules) {
      const routerFile = path.join(basePath, mod, 'routes.ts');

      if (routerFile && fs.existsSync(routerFile)) {
        import(routerFile).then((routes) => {
          app.use(routes.prefix, routes.router);
        });
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

export default { register };
