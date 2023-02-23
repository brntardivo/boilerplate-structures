import { UserEntity } from "@main/entities/user/entity";
import { IUsersRepository } from "@domain/shared/repositories/users/interface";
import { Password } from "@infra/adapters/password";
import { UserModel } from "@infra/database/models/UserModel";
import { Repository } from "typeorm";
import { AppDataSource } from "@infra/database/data-source";

const userRepository: Repository<UserModel> =
  AppDataSource.getRepository(UserModel);

export class UsersRepository implements IUsersRepository {
  async exists({ id }: UserEntity): Promise<boolean> {
    const exists = await userRepository.findOneBy({
      id,
    });

    return exists?.id ? true : false;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await userRepository.findOneBy({
      id,
    });

    if (user) {
      return UserEntity.hydrate(user, user.id);
    }

    return null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await userRepository.findOneBy({
      email,
    });

    if (user) {
      return UserEntity.hydrate(user, user.id);
    }

    return null;
  }

  async create(user: UserEntity): Promise<UserEntity | null> {
    Object.assign(user, {
      password: Password.hash(user.password),
    });

    const data = await userRepository.save(userRepository.create(user));

    if (data) {
      return UserEntity.hydrate(data, user.id);
    }

    return null;
  }

  async update(user: UserEntity): Promise<UserEntity | null> {
    const data = await userRepository.findOneBy({ id: user.id });

    if (data) {
      Object.assign(data, user);

      const updatedData = await data.save();

      if (updatedData) {
        return UserEntity.hydrate(updatedData, user.id);
      }
    }
    return null;
  }

  async delete({ id }: UserEntity): Promise<void> {
    await userRepository.softDelete(id);
  }
}
