import { ITokenEntity } from "@domain/shared/entities/token/interface";
import { TokenUsages } from "@domain/shared/constants";
import { randomUUID } from "crypto";

export class TokenEntity implements ITokenEntity {
  id: string;
  userId: string;
  usage: TokenUsages;
  expiresAt: Date;
  usedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: Omit<ITokenEntity, "id">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }

  static create(props: Omit<TokenEntity, "id">) {
    const token = new TokenEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return token;
  }

  static hydrate(props: Omit<TokenEntity, "id">, id: string) {
    const token = new TokenEntity(props, id);

    return token;
  }
}
