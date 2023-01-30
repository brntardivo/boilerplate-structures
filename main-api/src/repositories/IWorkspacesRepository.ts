import { WorkspaceEntity } from '@entities/WorkspaceEntity';
import { IBaseRepository } from '@repositories/IBaseRepository';
import { ITransactionRepository } from './ITransactionRepository';

export interface IWorkspacesRepository
  extends IBaseRepository<WorkspaceEntity>,
    ITransactionRepository {
  findBySlug(slug: string): Promise<WorkspaceEntity | null>;
  findByUser(userId: string): Promise<WorkspaceEntity[] | []>;
}
