import { Entity, Column, DeleteDateColumn, OneToMany } from "typeorm";
import { UserWorkspaceModel } from "src/infra/database/models/UserWorkspaceModel";
import { BaseModel } from "src/infra/database/models/BaseModel";

@Entity("users")
export class UserModel extends BaseModel {
  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "timestamptz", nullable: true })
  emailVerifiedAt?: Date;

  @Column({ type: "text" })
  password!: string;

  @OneToMany(() => UserWorkspaceModel, (userWorkspace) => userWorkspace.user)
  workspaces?: UserWorkspaceModel[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
