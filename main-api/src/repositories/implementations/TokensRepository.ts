import { TokenEntity } from '@entities/TokenEntity';
import { ITokensRepository } from '@repositories/ITokensRepository';
import { tokenModel } from 'src/database/models/TokenModel';
import { TransactionRepository } from '@repositories/TransactionRepository';

export class TokensRepository
  extends TransactionRepository
  implements ITokensRepository
{
  async exists(token: TokenEntity): Promise<boolean> {
    const exists = await tokenModel.exists({
      _id: token._id
    });

    return exists?._id ? true : false;
  }

  async findById(_id: string): Promise<TokenEntity | null> {
    const token = await tokenModel.findOne(
      {
        _id
      },
      null,
      { session: this.sessionInstance }
    );

    if (token) {
      return new TokenEntity(token.toJSON(), token._id);
    }

    return null;
  }

  async save(token: TokenEntity): Promise<TokenEntity | null> {
    const data = await tokenModel.findOneAndUpdate(
      {
        _id: token._id,
        userId: token.userId,
        usage: token.usage
      },
      token,
      { new: true, upsert: true, session: this.sessionInstance }
    );

    if (data) {
      return new TokenEntity(data.toJSON(), data._id);
    }

    return null;
  }

  async delete(token: TokenEntity): Promise<void> {
    await tokenModel.deleteMany(
      {
        _id: token._id
      },
      { session: this.sessionInstance }
    );
  }
}
