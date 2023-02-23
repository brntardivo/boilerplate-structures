import { Entity, Column, OneToMany } from "typeorm";
import { WorkspaceStatus, WorkspaceTypes } from "@domain/shared/constants";
import { UserWorkspaceModel } from "src/infra/database/models/UserWorkspaceModel";
import { BaseModel } from "src/infra/database/models/BaseModel";

@Entity("workspaces")
export class WorkspaceModel extends BaseModel {
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

  @OneToMany(
    () => UserWorkspaceModel,
    (userWorkspace) => userWorkspace.workspace
  )
  users?: UserWorkspaceModel[];
}
