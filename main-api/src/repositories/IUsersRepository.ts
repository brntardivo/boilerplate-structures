import { UserEntity } from "@entities/UserEntity";
import { IBaseRepository } from "@repositories/IBaseRepository";

export interface IUsersRepository extends IBaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
}
