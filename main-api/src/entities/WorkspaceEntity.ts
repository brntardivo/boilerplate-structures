import { v4 as uuid } from "uuid";
import { Slugify } from "@utils/helpers";
import { WorkspaceStatus, WorkspaceTypes } from "@utils/constants";

export class UserWorkspaceEntity {
  public readonly id: string;

  public userId: string;
  public profileId: string;
  public workspaceId: string;

  constructor(props: Omit<UserWorkspaceEntity, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export class WorkspaceEntity {
  public readonly id: string;

  public name: string;
  public slug?: string;
  public status?: WorkspaceStatus;
  public type: WorkspaceTypes;

  constructor(props: Omit<WorkspaceEntity, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }

    if (!this.slug) {
      this.slug = `${Slugify(this.type)}-${uuid()}`;
    }

    if (!this.status) {
      this.status = WorkspaceStatus.active;
    }
  }
}
