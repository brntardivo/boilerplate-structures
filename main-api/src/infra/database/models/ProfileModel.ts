import { Entity, Column, DeleteDateColumn } from "typeorm";

import { RoleTypes } from "@domain/shared/constants";
import { BaseModel } from "@infra/database/models/BaseModel";

@Entity("profiles")
export class ProfileModel extends BaseModel {
  @Column({ type: "enum", enum: RoleTypes })
  role!: RoleTypes;

  @DeleteDateColumn()
  deletedAt?: Date;
}
