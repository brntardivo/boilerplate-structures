import {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from "@main/config/environment";
import { DataSource } from "typeorm";

const dbConnection = async () => {
  const AppDataSource = new DataSource({
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  });

  return AppDataSource.initialize()
    .then(() => {
      console.log(
        `[\x1b[36mLOG\x1b[0m] successfully connected to the "${DB_HOST}:${DB_PORT}".`
      );
    })
    .catch((err: any) => {
      console.error(
        `[\x1b[31mERROR\x1b[0m] failed to connect to the "${DB_HOST}:${DB_PORT}".`
      );

      throw err;
    });
};

export { dbConnection };
