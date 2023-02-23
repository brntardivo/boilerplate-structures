import { TokenEntity } from "@main/entities/token/entity";
import { ITokensRepository } from "@domain/shared/repositories/tokens/interface";
import { TokenModel } from "@infra/database/models/TokenModel";
import { AppDataSource } from "@infra/database/data-source";
import { Repository } from "typeorm";

const tokenRepository: Repository<TokenModel> =
  AppDataSource.getRepository(TokenModel);
export class TokensRepository implements ITokensRepository {
  async exists({ id }: TokenEntity): Promise<boolean> {
    const exists = await tokenRepository.findOneBy({
      id,
    });

    return exists?.id ? true : false;
  }

  async findById(id: string): Promise<TokenEntity | null> {
    const token = await tokenRepository.findOneBy({
      id,
    });

    if (token) {
      return TokenEntity.hydrate(token, token.id);
    }

    return null;
  }

  async create(token: TokenEntity): Promise<TokenEntity | null> {
    const data = await tokenRepository.save(tokenRepository.create(token));

    if (data) {
      return TokenEntity.hydrate(data, token.id);
    }

    return null;
  }

  async update(token: TokenEntity): Promise<TokenEntity | null> {
    const data = await tokenRepository.findOneBy({
      id: token.id,
    });

    if (data) {
      Object.assign(data, token);

      const updatedData = await data.save();

      if (updatedData) {
        return TokenEntity.hydrate(updatedData, token.id);
      }
    }

    return null;
  }

  async delete({ id }: TokenEntity): Promise<void> {
    await tokenRepository.delete({
      id,
    });
  }
}
