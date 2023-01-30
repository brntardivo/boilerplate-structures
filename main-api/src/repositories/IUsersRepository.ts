import { UserEntity } from '@entities/UserEntity';
import { IBaseRepository } from '@repositories/IBaseRepository';
import { ITransactionRepository } from './ITransactionRepository';

export interface IUsersRepository
  extends IBaseRepository<UserEntity>,
    ITransactionRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
}
