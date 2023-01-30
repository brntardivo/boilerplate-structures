import "reflect-metadata";
import { API_NAME, API_PORT } from "@main/config/environment";
import { dbConnection } from "@main/config/database";

dbConnection()
  .then(async () => {
    const app = (await import("./config/app")).default;
    app.listen(API_PORT || 8000, () => {
      console.log(
        `[\x1b[32mINIT\x1b[0m] ${API_NAME} is online on port ${API_PORT}`
      );
    });
  })
  .catch(console.error);
