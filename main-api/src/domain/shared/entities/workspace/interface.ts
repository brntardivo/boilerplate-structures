import { WorkspaceStatus, WorkspaceTypes } from "@domain/shared/constants";

export interface IUserWorkspaceEntity {
  id: string;
  userId: string;
  profileId: string;
  workspaceId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWorkspaceEntity {
  id: string;
  name: string;
  slug?: string;
  status?: WorkspaceStatus;
  type: WorkspaceTypes;
  createdAt?: Date;
  updatedAt?: Date;
}
