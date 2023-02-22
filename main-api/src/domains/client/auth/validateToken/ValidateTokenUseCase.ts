import { IValidateTokenDTO } from "@domains/client/auth/validateToken/IValidateTokenDTO";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { ITokensRepository } from "@repositories/ITokensRepository";
import { badRequest, unprocessableEntity } from "@utils/errors";
import { TokenEntity } from "@entities/TokenEntity";
import { UserEntity } from "@entities/UserEntity";
import { parseISO, formatISO } from "date-fns";
import { CLIENT_URL } from "@config/environment";

export class ValidateTokenUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository
  ) {}
  async execute(data: IValidateTokenDTO): Promise<string> {
    const now = new Date();

    const token = await this.tokensRepository.findById(data.token);

    if (!token) {
      throw new unprocessableEntity("invalid token");
    }

    if (token.expiresAt) {
      const expiresAt = parseISO(token.expiresAt.toString());

      if (now > expiresAt) {
        await this.tokensRepository?.delete(token);

        throw new unprocessableEntity("expired token");
      }
    }

    const user = await this.usersRepository.findById(token.userId);

    if (!user) {
      throw new badRequest("unable to find owner of this token");
    }

    await this.usersRepository.update(
      new UserEntity({ ...user, emailVerifiedAt: formatISO(now) }, user.id)
    );

    await this.tokensRepository.update(
      new TokenEntity({ ...token, usedAt: formatISO(now) }, token.id)
    );

    return CLIENT_URL;
  }
}
