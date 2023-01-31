import { Entity, Column, ManyToOne } from "typeorm";
import { UserModel } from "@database/models/UserModel";
import { ProfileModel } from "@database/models/ProfileModel";
import { WorkspaceModel } from "@database/models/WorkspaceModel";
import { BaseModel } from "@database/models/BaseModel";

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
