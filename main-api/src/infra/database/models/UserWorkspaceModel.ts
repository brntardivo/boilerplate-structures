import { Entity, Column, ManyToOne } from "typeorm";
import { UserModel } from "src/infra/database/models/UserModel";
import { ProfileModel } from "src/infra/database/models/ProfileModel";
import { WorkspaceModel } from "src/infra/database/models/WorkspaceModel";
import { BaseModel } from "src/infra/database/models/BaseModel";

@Entity("user_workspace")
export class UserWorkspaceModel extends BaseModel {
  @Column({ type: "uuid" })
  userId!: string;

  @Column({ type: "uuid" })
  workspaceId!: string;

  @Column({ type: "uuid" })
  profileId!: string;

  @ManyToOne(() => UserModel)
  user?: UserModel;

  @ManyToOne(() => WorkspaceModel)
  workspace?: WorkspaceModel;

  @ManyToOne(() => ProfileModel)
  profile?: ProfileModel;
}
