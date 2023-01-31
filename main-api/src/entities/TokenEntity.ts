import { v4 as uuid } from "uuid";
import { TokenUsages } from "@config/constants";
export class TokenEntity {
  public readonly id: string;

  public userId: string;
  public usage: TokenUsages;
  public expiresAt: Date | string;
  public usedAt?: Date | string;

  constructor(props: Omit<TokenEntity, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
