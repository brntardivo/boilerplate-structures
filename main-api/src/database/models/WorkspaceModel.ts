import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { WorkspaceStatus } from "@utils/constants";
import { UserWorkspace } from "@database/models/UserWorkspaceModel";

@Entity()
export class Workspace {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({
    type: "enum",
    enum: WorkspaceStatus,
    default: WorkspaceStatus.active,
  })
  status: WorkspaceStatus;

  @OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.workspace)
  users: UserWorkspace[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
