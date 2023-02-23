import { Entity, Column, DeleteDateColumn } from "typeorm";
import { BaseModel } from "src/infra/database/models/BaseModel";

@Entity("admins")
export class AdminModel extends BaseModel {
  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text" })
  password!: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
