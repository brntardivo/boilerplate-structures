import { IAdminEntity } from "@domain/shared/entities/admin/interface";
import { randomUUID } from "crypto";

export class AdminEntity implements IAdminEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  private constructor(props: Omit<IAdminEntity, "id">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }

  static create(props: Omit<AdminEntity, "id">) {
    const admin = new AdminEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    });

    return admin;
  }

  static hydrate(props: Omit<AdminEntity, "id">, id: string) {
    const admin = new AdminEntity(props, id);

    return admin;
  }
}
