import { AdminEntity } from "@main/entities/admin/entity";
import { IAdminsRepository } from "@domain/shared/repositories/admins/interface";
import { Password } from "@infra/adapters/password";

export class AdminsInMemoryRepository implements IAdminsRepository {
  public items: AdminEntity[] = [];

  async exists({ id }: AdminEntity): Promise<boolean> {
    const exists = this.items.find((item) => item.id === id);

    return exists?.id ? true : false;
  }

  async findById(id: string): Promise<AdminEntity | null> {
    const admin = this.items.find((item) => item.id === id);

    if (admin) {
      return AdminEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async findByEmail(email: string): Promise<AdminEntity | null> {
    const admin = this.items.find((item) => item.email === email);

    if (admin) {
      return AdminEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async create(admin: AdminEntity): Promise<AdminEntity | null> {
    Object.assign(admin, {
      password: Password.hash(admin.password),
    });

    const data = this.items.push(admin);

    if (data) {
      return AdminEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async update(admin: AdminEntity): Promise<AdminEntity | null> {
    const index = this.items.findIndex((item) => item.id === admin.id);

    if (index > -1) {
      Object.assign(this.items[index], admin);

      this.items[index] = {
        ...this.items[index],
        ...admin,
      };

      return AdminEntity.hydrate(this.items[index], admin.id);
    }
    return null;
  }

  async delete({ id }: AdminEntity): Promise<void> {
    this.items.filter((item) => item.id !== id);
  }
}
