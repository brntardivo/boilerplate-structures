import { Slugify } from "@main/utils/helpers";
import { WorkspaceStatus, WorkspaceTypes } from "@domain/shared/constants";
import {
  IWorkspaceEntity,
  IUserWorkspaceEntity,
} from "@domain/shared/entities/workspace/interface";
import { randomUUID } from "crypto";

export class WorkspaceEntity implements IWorkspaceEntity {
  id: string;
  name: string;
  slug?: string;
  status?: WorkspaceStatus;
  type: WorkspaceTypes;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: Omit<IWorkspaceEntity, "id">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }

  static create(props: Omit<IWorkspaceEntity, "id">) {
    const workspace = new WorkspaceEntity({
      ...props,
      slug: props.slug ?? `${Slugify(props.type)}-${randomUUID()}`,
      status: props.status ?? WorkspaceStatus.active,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return workspace;
  }

  static hydrate(props: Omit<IWorkspaceEntity, "id">, id: string) {
    const workspace = new WorkspaceEntity(props, id);

    return workspace;
  }
}

export class UserWorkspaceEntity implements IUserWorkspaceEntity {
  id: string;
  userId: string;
  profileId: string;
  workspaceId: string;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: Omit<IUserWorkspaceEntity, "id">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }

  static create(props: Omit<IUserWorkspaceEntity, "id">) {
    const userWorkspace = new UserWorkspaceEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return userWorkspace;
  }

  static hydrate(props: Omit<IUserWorkspaceEntity, "id">, id: string) {
    const userWorkspace = new UserWorkspaceEntity(props, id);

    return userWorkspace;
  }
}
