import { AdminEntity } from "@entities/AdminEntity";
import { IBaseRepository } from "@repositories/IBaseRepository";

export interface IAdminsRepository extends IBaseRepository<AdminEntity> {
  findByEmail(email: string): Promise<AdminEntity | null>;
}
