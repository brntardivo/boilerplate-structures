import { Entity, Column } from "typeorm";
import { TokenUsages } from "@utils/constants";
import { Model } from "@database/entities/BaseEntity";

@Entity("tokens")
export class Token extends Model {
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
