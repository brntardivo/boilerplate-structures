import { WorkspaceEntity } from '@entities/WorkspaceEntity';
import { IWorkspacesRepository } from '@repositories/IWorkspacesRepository';
import { workspaceModel } from 'src/database/models/WorkspaceModel';
import { TransactionRepository } from '@repositories/TransactionRepository';

export class WorkspacesRepository
  extends TransactionRepository
  implements IWorkspacesRepository
{
  async exists(workspace: WorkspaceEntity): Promise<boolean> {
    const exists = await workspaceModel.exists({
      _id: workspace._id
    });

    return exists?._id ? true : false;
  }

  async findById(_id: string): Promise<WorkspaceEntity | null> {
    const workspace = await workspaceModel.findOne(
      {
        _id
      },
      null,
      { session: this.sessionInstance }
    );

    if (workspace) {
      return new WorkspaceEntity(workspace.toJSON(), workspace._id);
    }

    return null;
  }

  async findBySlug(slug: string): Promise<WorkspaceEntity | null> {
    const workspace = await workspaceModel.findOne(
      {
        slug
      },
      null,
      { session: this.sessionInstance }
    );

    if (workspace) {
      return new WorkspaceEntity(workspace.toJSON(), workspace._id);
    }

    return null;
  }

  async findByUser(userId: string): Promise<WorkspaceEntity[] | []> {
    return await workspaceModel.find(
      {
        'users.userId': userId
      },
      null,
      { session: this.sessionInstance }
    );
  }

  async save(workspace: WorkspaceEntity): Promise<WorkspaceEntity | null> {
    const exists = await this.findById(workspace._id);

    const data = await workspaceModel.findOneAndUpdate(
      {
        _id: workspace._id
      },
      {
        ...exists,
        ...workspace
      },
      { new: true, upsert: true, session: this.sessionInstance }
    );

    if (data) {
      return new WorkspaceEntity(data.toJSON(), data._id);
    }

    return null;
  }
}
