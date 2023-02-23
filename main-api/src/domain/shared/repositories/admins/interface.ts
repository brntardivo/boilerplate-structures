import { IAdminEntity } from "@domain/shared/entities/admin/interface";
import { IBaseRepository } from "@domain/shared/repositories/base/interface";

export interface IAdminsRepository extends IBaseRepository<IAdminEntity> {
  findByEmail(email: string): Promise<IAdminEntity | null>;
}
