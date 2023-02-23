import { AdminEntity } from "@main/entities/admin/entity";
import { IAdminsRepository } from "@domain/shared/repositories/admins/interface";
import { Password } from "@infra/adapters/password";
import { AdminModel } from "src/infra/database/models/AdminModel";
import { Repository } from "typeorm";
import { AppDataSource } from "src/infra/database/data-source";

const adminRepository: Repository<AdminModel> =
  AppDataSource.getRepository(AdminModel);

export class AdminsRepository implements IAdminsRepository {
  async exists({ id }: AdminEntity): Promise<boolean> {
    const exists = await adminRepository.findOneBy({
      id,
    });

    return exists?.id ? true : false;
  }

  async findById(id: string): Promise<AdminEntity | null> {
    const admin = await adminRepository.findOneBy({
      id,
    });

    if (admin) {
      return AdminEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async findByEmail(email: string): Promise<AdminEntity | null> {
    const admin = await adminRepository.findOneBy({
      email,
    });

    if (admin) {
      return AdminEntity.hydrate(admin, admin.id);
    }

    return null;
  }

  async create(admin: AdminEntity): Promise<AdminEntity | null> {
    Object.assign(admin, {
      password: Password.hash(admin.password),
    });

    const data = await adminRepository.save(adminRepository.create(admin));

    if (data) {
      return AdminEntity.hydrate(data, admin.id);
    }

    return null;
  }

  async update(admin: AdminEntity): Promise<AdminEntity | null> {
    const data = await adminRepository.findOneBy({ id: admin.id });

    if (data) {
      Object.assign(data, admin);

      const updatedData = await data.save();

      if (updatedData) {
        return AdminEntity.hydrate(updatedData, admin.id);
      }
    }
    return null;
  }

  async delete({ id }: AdminEntity): Promise<void> {
    await adminRepository.softDelete(id);
  }
}
