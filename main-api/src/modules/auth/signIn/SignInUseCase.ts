import { IUsersRepository } from "@repositories/IUsersRepository";
import { IWorkspacesRepository } from "@repositories/IWorkspacesRepository";
import { ISignInDTO } from "@modules/auth/signIn/ISignInDTO";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { unauthorized } from "@utils/errors";

import { JWT_SECRET } from "src/config/environment";
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
