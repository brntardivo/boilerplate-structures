import { Entity, Column, OneToMany } from "typeorm";
import { WorkspaceStatus, WorkspaceTypes } from "@utils/constants";
import { UserWorkspace } from "@database/entities/UserWorkspaceEntity";
import { Model } from "@database/entities/BaseEntity";

@Entity("workspaces")
export class Workspace extends Model {
  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", unique: true })
  slug!: string;

  @Column({
    type: "enum",
    enum: WorkspaceStatus,
    default: WorkspaceStatus.active,
  })
  status!: WorkspaceStatus;

  @Column({
    type: "enum",
    enum: WorkspaceTypes,
  })
  type!: WorkspaceTypes;

  @OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.workspace)
  users?: UserWorkspace[];
}
