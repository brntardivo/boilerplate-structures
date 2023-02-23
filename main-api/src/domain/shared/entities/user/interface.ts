export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  emailVerifiedAt?: Date;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
