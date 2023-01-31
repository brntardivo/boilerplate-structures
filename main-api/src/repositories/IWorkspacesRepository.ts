import { WorkspaceEntity } from "@entities/WorkspaceEntity";
import { IBaseRepository } from "@repositories/IBaseRepository";

export interface IWorkspacesRepository
  extends IBaseRepository<WorkspaceEntity> {
  findBySlug(slug: string): Promise<WorkspaceEntity | null>;
  findByUser(userId: string): Promise<WorkspaceEntity[] | []>;
}
