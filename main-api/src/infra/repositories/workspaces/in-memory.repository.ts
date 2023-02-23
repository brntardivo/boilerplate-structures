import { WorkspaceEntity } from "@main/entities/workspace/entity";
import { IWorkspacesRepository } from "@domain/shared/repositories/workspaces/interface";

export class WorkspacesInMemoryRepository implements IWorkspacesRepository {
  public items: WorkspaceEntity[] = [];

  async exists({ id }: WorkspaceEntity): Promise<boolean> {
    const exists = this.items.find((item) => item.id === id);

    return exists?.id ? true : false;
  }

  async findById(id: string): Promise<WorkspaceEntity | null> {
    const admin = this.items.find((item) => item.id === id);

    if (admin) {
      return WorkspaceEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async findBySlug(slug: string): Promise<WorkspaceEntity | null> {
    const workspace = this.items.find((item) => item.slug === slug);

    if (workspace) {
      return WorkspaceEntity.hydrate(workspace, workspace.id);
    }

    return null;
  }

  async findByUser(userId: string): Promise<WorkspaceEntity[] | []> {
    return [];
  }

  async create(admin: WorkspaceEntity): Promise<WorkspaceEntity | null> {
    const data = this.items.push(admin);

    if (data) {
      return WorkspaceEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async update(admin: WorkspaceEntity): Promise<WorkspaceEntity | null> {
    const index = this.items.findIndex((item) => item.id === admin.id);

    if (index > -1) {
      Object.assign(this.items[index], admin);

      this.items[index] = {
        ...this.items[index],
        ...admin,
      };

      return WorkspaceEntity.hydrate(this.items[index], admin.id);
    }
    return null;
  }

  async delete({ id }: WorkspaceEntity): Promise<void> {
    this.items.filter((item) => item.id !== id);
  }
}
