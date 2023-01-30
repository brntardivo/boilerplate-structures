import { v4 as uuid } from "uuid";
import { Slugify } from "@utils/helpers";
import { WorkspaceStatus, WorkspaceTypes } from "@utils/constants";

export class WorkspaceUserRelationshipEntity {
  public readonly _id: string;

  public userId: string;
  public role?: string;

  constructor(
    props: Omit<WorkspaceUserRelationshipEntity, "id" | "_id">,
    _id?: string
  ) {
    Object.assign(this, props);

    if (!_id) {
      this._id = uuid();
    }
  }
}

export class WorkspaceEntity {
  public readonly _id: string;

  public name: string;
  public slug?: string;
  public status?: WorkspaceStatus;
  public type: WorkspaceTypes;
  public users: Array<WorkspaceUserRelationshipEntity>;

  constructor(props: Omit<WorkspaceEntity, "id" | "_id">, _id?: string) {
    Object.assign(this, props);

    if (!_id) {
      this._id = uuid();
    }

    if (!this.slug) {
      this.slug = `${Slugify(this.type)}-${uuid()}`;
    }

    if (!this.status) {
      this.status = WorkspaceStatus.active;
    }
  }
}
