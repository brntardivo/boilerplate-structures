import { Entity, Column, DeleteDateColumn, OneToMany } from "typeorm";
import { UserWorkspace } from "@database/entities/UserWorkspaceEntity";
import { Model } from "@database/entities/BaseEntity";
@Entity("users")
export class User extends Model {
  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "timestamptz", nullable: true })
  emailVerifiedAt?: Date;

  @Column({ type: "text" })
  password!: string;

  @OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.user)
  workspaces?: UserWorkspace[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
