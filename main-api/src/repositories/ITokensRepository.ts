import { TokenEntity } from '@entities/TokenEntity';
import { IBaseRepository } from '@repositories/IBaseRepository';
import { ITransactionRepository } from './ITransactionRepository';

export interface ITokensRepository
  extends IBaseRepository<TokenEntity>,
    ITransactionRepository {
  delete(t: TokenEntity): Promise<void>;
}
