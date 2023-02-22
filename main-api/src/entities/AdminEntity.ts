import { v4 as uuid } from "uuid";

export class AdminEntity {
  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;
  public deletedAt?: Date | string;

  constructor(props: Omit<AdminEntity, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
