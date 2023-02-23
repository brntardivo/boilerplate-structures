import { IUserEntity } from "@domain/shared/entities/user/interface";
import { randomUUID } from "crypto";

export class UserEntity implements IUserEntity {
  id: string;
  name: string;
  email: string;
  emailVerifiedAt?: Date;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  private constructor(props: Omit<IUserEntity, "id">, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomUUID();
  }

  static create(props: Omit<IUserEntity, "id">) {
    const user = new UserEntity({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    });

    return user;
  }

  static hydrate(props: Omit<IUserEntity, "id">, id: string) {
    const user = new UserEntity(props, id);

    return user;
  }
}
