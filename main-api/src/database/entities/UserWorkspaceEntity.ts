import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "@database/entities/UserEntity";
import { Profile } from "@database/entities/ProfileEntity";
import { Workspace } from "@database/entities/WorkspaceEntity";
import { Model } from "@database/entities/BaseEntity";

@Entity("user_workspace")
export class UserWorkspace extends Model {
  @Column({ type: "uuid" })
  userId!: string;

  @Column({ type: "uuid" })
  workspaceId!: string;

  @Column({ type: "uuid" })
  profileId!: string;

  @ManyToOne(() => User)
  user?: User;

  @ManyToOne(() => Workspace)
  workspace?: Workspace;

  @ManyToOne(() => Profile)
  profile?: Workspace;
}
