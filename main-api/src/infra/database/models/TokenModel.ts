import { Entity, Column } from "typeorm";
import { TokenUsages } from "@domain/shared/constants";
import { BaseModel } from "@infra/database/models/BaseModel";

@Entity("tokens")
export class TokenModel extends BaseModel {
  @Column({ type: "uuid" })
  userId!: string;

  @Column({
    type: "enum",
    enum: TokenUsages,
  })
  usage!: TokenUsages;

  @Column({ type: "timestamptz" })
  expiresAt!: Date;

  @Column({ type: "timestamptz", nullable: true })
  usedAt?: Date;
}
