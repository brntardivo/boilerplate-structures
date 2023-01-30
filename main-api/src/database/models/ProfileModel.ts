import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { RoleTypes } from "@utils/constants";

@Entity()
export class Profile {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "enum", enum: RoleTypes })
  role: RoleTypes;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
