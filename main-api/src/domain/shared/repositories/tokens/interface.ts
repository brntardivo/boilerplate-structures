import { ITokenEntity } from "@domain/shared/entities/token/interface";
import { IBaseRepository } from "@domain/shared/repositories/base/interface";

export interface ITokensRepository extends IBaseRepository<ITokenEntity> {
  delete(t: ITokenEntity): Promise<void>;
}
