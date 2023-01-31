import { WorkspaceModel } from "@entities/WorkspaceModel";
import { IBaseRepository } from "@repositories/IBaseRepository";

export interface IWorkspacesRepository extends IBaseRepository<WorkspaceModel> {
  findBySlug(slug: string): Promise<WorkspaceModel | null>;
  findByUser(userId: string): Promise<WorkspaceModel[] | []>;
}
