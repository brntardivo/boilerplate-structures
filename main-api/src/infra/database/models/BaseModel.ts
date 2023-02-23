import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BaseEntity,
} from "typeorm";

export abstract class BaseModel extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
