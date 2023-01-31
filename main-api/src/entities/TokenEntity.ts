import { v4 as uuid } from "uuid";
import { TokenUsages } from "@utils/constants";
export class TokenEntity {
  public readonly id: string;

  public userId: string;
  public usage: TokenUsages;
  public expiresAt: number | Date;
  public usedAt?: number | Date;

  constructor(props: Omit<TokenEntity, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
