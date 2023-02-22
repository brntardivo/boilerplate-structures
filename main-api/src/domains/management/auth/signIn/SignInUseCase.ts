import { IAdminsRepository } from "@repositories/IAdminsRepository";
import { ISignInDTO } from "@domains/management/auth/signIn/ISignInDTO";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { unauthorized } from "@utils/errors";
import { JWT_SECRET } from "src/config/environment";

export class SignInUseCase {
  constructor(private adminsRepository: IAdminsRepository) {}
  async execute(data: ISignInDTO): Promise<object> {
    const user = await this.adminsRepository.findByEmail(data.email);

    if (!user) {
      throw new unauthorized("invalid credentials");
    }

    if (!compareSync(data.password, user.password)) {
      throw new unauthorized("invalid credentials");
    }

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
      token,
    };
  }
}
