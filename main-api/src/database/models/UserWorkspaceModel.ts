import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "@database/models/UserModel";
import { Profile } from "@database/models/ProfileModel";
import { Workspace } from "@database/models/WorkspaceModel";

@Entity()
export class UserWorkspace {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "uuid" })
  userId: string;

  @Column({ type: "uuid" })
  workspaceId: string;

  @Column({ type: "uuid" })
  profileId: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @ManyToOne(() => Profile)
  profile: Workspace;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
