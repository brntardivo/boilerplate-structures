import { v4 as uuid } from "uuid";

export class UserEntity {
  public readonly id: string;

  public name: string;
  public email: string;
  public emailVerifiedAt?: number | Date;
  public password: string;
  public deletedAt?: number | Date;

  constructor(props: Omit<UserEntity, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
