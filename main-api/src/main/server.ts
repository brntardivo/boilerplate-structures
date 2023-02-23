import "reflect-metadata";
import { API_NAME, API_PORT, DB_HOST, DB_PORT } from "@main/config/environment";
import { AppDataSource } from "@infra/database/data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log(
      `[\x1b[36mLOG\x1b[0m] successfully connected to the "${DB_HOST}:${DB_PORT}".`
    );

    const app = (await import("./config/app")).default;
    app.listen(API_PORT || 8000, () => {
      console.log(
        `[\x1b[32mINIT\x1b[0m] ${API_NAME} is online on port ${API_PORT}`
      );
    });
  })
  .catch((err: any) => {
    console.error(
      `[\x1b[31mERROR\x1b[0m] failed to connect to the "${DB_HOST}:${DB_PORT}".`
    );

    console.error(err);
  });
