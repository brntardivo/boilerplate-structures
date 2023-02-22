import { AdminEntity } from "@entities/AdminEntity";
import { IAdminsRepository } from "@repositories/IAdminsRepository";
import { Password } from "@utils/password";
import { AdminModel } from "@database/models/AdminModel";
import { Repository } from "typeorm";
import { AppDataSource } from "@database/data-source";

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
      return new AdminEntity(admin, admin.id);
    }

    return null;
  }

  async findByEmail(email: string): Promise<AdminEntity | null> {
    const admin = await adminRepository.findOneBy({
      email,
    });

    if (admin) {
      return new AdminEntity(admin, admin.id);
    }

    return null;
  }

  async create(admin: AdminEntity): Promise<AdminEntity | null> {
    Object.assign(admin, {
      password: Password.hash(admin.password),
    });

    const data = await adminRepository.save(adminRepository.create(admin));

    if (data) {
      return new AdminEntity(data, admin.id);
    }

    return null;
  }

  async update(admin: AdminEntity): Promise<AdminEntity | null> {
    const data = await adminRepository.findOneBy({ id: admin.id });

    if (data) {
      Object.assign(data, admin);

      const updatedData = await data.save();

      if (updatedData) {
        return new AdminEntity(updatedData, admin.id);
      }
    }
    return null;
  }

  async delete({ id }: AdminEntity): Promise<void> {
    await adminRepository.softDelete(id);
  }
}
