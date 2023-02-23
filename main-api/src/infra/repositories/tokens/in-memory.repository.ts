import { TokenEntity } from "@main/entities/token/entity";
import { ITokensRepository } from "@domain/shared/repositories/tokens/interface";

export class TokensInMemoryRepository implements ITokensRepository {
  public items: TokenEntity[] = [];

  async exists({ id }: TokenEntity): Promise<boolean> {
    const exists = this.items.find((item) => item.id === id);

    return exists?.id ? true : false;
  }

  async findById(id: string): Promise<TokenEntity | null> {
    const admin = this.items.find((item) => item.id === id);

    if (admin) {
      return TokenEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async create(admin: TokenEntity): Promise<TokenEntity | null> {
    const data = this.items.push(admin);

    if (data) {
      return TokenEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async update(admin: TokenEntity): Promise<TokenEntity | null> {
    const index = this.items.findIndex((item) => item.id === admin.id);

    if (index > -1) {
      Object.assign(this.items[index], admin);

      this.items[index] = {
        ...this.items[index],
        ...admin,
      };

      return TokenEntity.hydrate(this.items[index], admin.id);
    }
    return null;
  }

  async delete({ id }: TokenEntity): Promise<void> {
    this.items.filter((item) => item.id !== id);
  }
}
