import { Profile } from "@database/entities/ProfileEntity";
import { Token } from "@database/entities/TokenEntity";
import { User } from "@database/entities/UserEntity";
import { UserWorkspace } from "@database/entities/UserWorkspaceEntity";
import { Workspace } from "@database/entities/WorkspaceEntity";
import {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from "@main/config/environment";
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
  entities: [Profile, Token, User, UserWorkspace, Workspace],
});
