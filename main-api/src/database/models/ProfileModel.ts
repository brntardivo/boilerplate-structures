import { Entity, Column, DeleteDateColumn } from "typeorm";

import { RoleTypes } from "@config/constants";
import { BaseModel } from "@database/models/BaseModel";

@Entity("profiles")
export class ProfileModel extends BaseModel {
  @Column({ type: "enum", enum: RoleTypes })
  role!: RoleTypes;

  @DeleteDateColumn()
  deletedAt?: Date;
}
