import { WorkspaceEntity } from "@entities/WorkspaceEntity";
import { IWorkspacesRepository } from "@repositories/IWorkspacesRepository";
import { WorkspaceModel } from "@database/models/WorkspaceModel";
// import { UserWorkspaceModel } from "@database/models/UserWorkspaceModel";
import { Repository } from "typeorm";
import { AppDataSource } from "@database/data-source";

const workspaceRepository: Repository<WorkspaceModel> =
  AppDataSource.getRepository(WorkspaceModel);

// const userWorkspaceRepository: Repository<UserWorkspaceModel> =
//   AppDataSource.getRepository(UserWorkspaceModel);

export class WorkspacesRepository implements IWorkspacesRepository {
  async exists({ id }: WorkspaceEntity): Promise<boolean> {
    const exists = await workspaceRepository.findOneBy({
      id,
    });

    return exists?.id ? true : false;
  }

  async findById(id: string): Promise<WorkspaceEntity | null> {
    const workspace = await workspaceRepository.findOneBy({
      id,
    });

    if (workspace) {
      return new WorkspaceEntity(workspace, workspace.id);
    }

    return null;
  }

  async findBySlug(slug: string): Promise<WorkspaceEntity | null> {
    const workspace = await workspaceRepository.findOneBy({
      slug,
    });

    if (workspace) {
      return new WorkspaceEntity(workspace, workspace.id);
    }

    return null;
  }

  async findByUser(userId: string): Promise<WorkspaceEntity[] | []> {
    return await workspaceRepository.find({
      relations: ["users"],
      loadRelationIds: true,
      where: {
        users: {
          userId,
        },
      },
    });
  }

  async create(workspace: WorkspaceEntity): Promise<WorkspaceEntity | null> {
    const data = await workspaceRepository.save(
      workspaceRepository.create(workspace)
    );

    if (data) {
      return new WorkspaceEntity(data, data.id);
    }

    return null;
  }

  async update(workspace: WorkspaceEntity): Promise<WorkspaceEntity | null> {
    const data = await workspaceRepository.findOneBy({ id: workspace.id });

    if (data) {
      Object.assign(data, workspace);

      const updatedData = await data.save();

      if (updatedData) {
        return new WorkspaceEntity(updatedData, workspace.id);
      }
    }
    return null;
  }
}
