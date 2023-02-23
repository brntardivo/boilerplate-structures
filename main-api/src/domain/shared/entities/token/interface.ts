import { TokenUsages } from "@domain/shared/constants";

export interface ITokenEntity {
  id: string;
  userId: string;
  usage: TokenUsages;
  expiresAt: Date;
  usedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
