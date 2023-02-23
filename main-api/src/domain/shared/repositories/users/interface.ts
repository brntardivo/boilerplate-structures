import { IUserEntity } from "@domain/shared/entities/user/interface";
import { IBaseRepository } from "@domain/shared/repositories/base/interface";

export interface IUsersRepository extends IBaseRepository<IUserEntity> {
  findByEmail(email: string): Promise<IUserEntity | null>;
}
