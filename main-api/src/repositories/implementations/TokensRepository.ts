import { TokenEntity } from "@entities/TokenEntity";
import { ITokensRepository } from "@repositories/ITokensRepository";
import { TokenModel } from "@database/models/TokenModel";

import { AppDataSource } from "@database/data-source";
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
      return new TokenEntity(token, token.id);
    }

    return null;
  }

  async create(token: TokenEntity): Promise<TokenEntity | null> {
    const data = await tokenRepository.save(tokenRepository.create(token));

    if (data) {
      return new TokenEntity(data, token.id);
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
        return new TokenEntity(updatedData, token.id);
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
