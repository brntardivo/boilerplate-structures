import { UserEntity } from "@main/entities/user/entity";
import { IUsersRepository } from "@domain/shared/repositories/users/interface";
import { Password } from "@infra/adapters/password";

export class UsersInMemoryRepository implements IUsersRepository {
  public items: UserEntity[] = [];

  async exists({ id }: UserEntity): Promise<boolean> {
    const exists = this.items.find((item) => item.id === id);

    return exists?.id ? true : false;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const admin = this.items.find((item) => item.id === id);

    if (admin) {
      return UserEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const admin = this.items.find((item) => item.email === email);

    if (admin) {
      return UserEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async create(admin: UserEntity): Promise<UserEntity | null> {
    Object.assign(admin, {
      password: Password.hash(admin.password),
    });

    const data = this.items.push(admin);

    if (data) {
      return UserEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async update(admin: UserEntity): Promise<UserEntity | null> {
    const index = this.items.findIndex((item) => item.id === admin.id);

    if (index > -1) {
      Object.assign(this.items[index], admin);

      this.items[index] = {
        ...this.items[index],
        ...admin,
      };

      return UserEntity.hydrate(this.items[index], admin.id);
    }
    return null;
  }

  async delete({ id }: UserEntity): Promise<void> {
    this.items.filter((item) => item.id !== id);
  }
}
