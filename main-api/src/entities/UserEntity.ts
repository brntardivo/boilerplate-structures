import { v4 as uuid } from "uuid";

export class UserEntity {
  public readonly _id: string;

  public name: string;
  public email: string;
  public emailVerifiedAt?: number | Date;
  public password: string;
  public deletedAt?: number | Date;

  constructor(props: Omit<UserEntity, "id" | "_id">, _id?: string) {
    Object.assign(this, props);

    if (!_id) {
      this._id = uuid();
    }
  }
}
