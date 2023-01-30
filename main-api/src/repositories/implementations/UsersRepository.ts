import { UserEntity } from '@entities/UserEntity';
import { IUsersRepository } from '@repositories/IUsersRepository';
import { TransactionRepository } from '@repositories/TransactionRepository';
import { Password } from '@utils/password';
import { userModel } from '@database/models/UserModel';

export class UsersRepository
  extends TransactionRepository
  implements IUsersRepository
{
  async exists(user: UserEntity): Promise<boolean> {
    const exists = await userModel.exists({
      _id: user._id,
      deletedAt: { $eq: null }
    });

    return exists?._id ? true : false;
  }

  async findById(_id: string): Promise<UserEntity | null> {
    const user = await userModel.findOne(
      {
        _id,
        deletedAt: { $eq: null }
      },
      null,
      { session: this.sessionInstance }
    );

    if (user) {
      return new UserEntity(user.toJSON(), user._id);
    }

    return null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await userModel.findOne(
      {
        email,
        deletedAt: { $eq: null }
      },
      null,
      { session: this.sessionInstance }
    );

    if (user) {
      return new UserEntity(user.toJSON(), user._id);
    }

    return null;
  }

  async save(user: UserEntity): Promise<UserEntity | null> {
    const exists = await this.findById(user._id);

    if (!exists) {
      user = {
        ...user,
        password: Password.hash(user.password)
      };
    }

    const data = await userModel.findOneAndUpdate(
      {
        _id: user._id
      },
      {
        ...exists,
        ...user
      },
      { new: true, upsert: true, session: this.sessionInstance }
    );

    if (data) {
      return new UserEntity(data.toJSON(), data._id);
    }

    return null;
  }

  async delete(user: UserEntity): Promise<void> {
    const deletedAt = new Date();

    await userModel.findOneAndUpdate(
      {
        _id: user._id
      },
      {
        $set: {
          deletedAt
        }
      },
      { session: this.sessionInstance }
    );
  }
}
