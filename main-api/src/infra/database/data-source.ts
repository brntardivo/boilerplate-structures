import { ProfileModel } from "src/infra/database/models/ProfileModel";
import { TokenModel } from "src/infra/database/models/TokenModel";
import { UserModel } from "src/infra/database/models/UserModel";
import { UserWorkspaceModel } from "src/infra/database/models/UserWorkspaceModel";
import { WorkspaceModel } from "src/infra/database/models/WorkspaceModel";
import { AdminModel } from "src/infra/database/models/AdminModel";
import {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from "src/main/config/environment";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  // logging: true,
  synchronize: true,
  entities: [
    ProfileModel,
    TokenModel,
    UserModel,
    UserWorkspaceModel,
    WorkspaceModel,
    AdminModel,
  ],
});
