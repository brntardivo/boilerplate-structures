import { TokenEntity } from "@entities/TokenEntity";
import { IBaseRepository } from "@repositories/IBaseRepository";

export interface ITokensRepository extends IBaseRepository<TokenEntity> {
  delete(t: TokenEntity): Promise<void>;
}
