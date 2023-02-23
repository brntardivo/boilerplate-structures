import { IUsersRepository } from "@domain/shared/repositories/users/interface";
import { IWorkspacesRepository } from "@domain/shared/repositories/workspaces/interface";
import { ISignInDTO } from "@domain/client/signIn/ISignInDTO";
import { JWT_SECRET } from "@main/config/environment";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { unauthorized } from "@main/utils/errors";

export class SignInUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private workspacesRepository: IWorkspacesRepository
  ) {}
  async execute(data: ISignInDTO): Promise<object> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new unauthorized("invalid credentials");
    }

    if (!user.emailVerifiedAt) {
      throw new unauthorized("email not verified");
    }

    if (!compareSync(data.password, user.password)) {
      throw new unauthorized("invalid credentials");
    }

    const workplaces = await this.workspacesRepository.findByUser(user.id);

    const token = sign(
      {
        userId: user.id,
      },
      JWT_SECRET
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      workplaces,
      token,
    };
  }
}
