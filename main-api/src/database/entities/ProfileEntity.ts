import { Entity, Column, DeleteDateColumn } from "typeorm";

import { RoleTypes } from "@utils/constants";
import { Model } from "@database/entities/BaseEntity";

@Entity("profiles")
export class Profile extends Model {
  @Column({ type: "enum", enum: RoleTypes })
  role!: RoleTypes;

  @DeleteDateColumn()
  deletedAt?: Date;
}
