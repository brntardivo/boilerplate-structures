import { IWorkspaceEntity } from "@domain/shared/entities/workspace/interface";
import { IBaseRepository } from "@domain/shared/repositories/base/interface";

export interface IWorkspacesRepository
  extends IBaseRepository<IWorkspaceEntity> {
  findBySlug(slug: string): Promise<IWorkspaceEntity | null>;
  findByUser(userId: string): Promise<IWorkspaceEntity[] | []>;
}
