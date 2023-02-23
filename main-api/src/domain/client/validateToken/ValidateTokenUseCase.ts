import { IValidateTokenDTO } from "@domain/client/validateToken/IValidateTokenDTO";
import { IUsersRepository } from "@domain/shared/repositories/users/interface";
import { ITokensRepository } from "@domain/shared/repositories/tokens/interface";
import { badRequest, unprocessableEntity } from "@main/utils/errors";
import { TokenEntity } from "@main/entities/token/entity";
import { UserEntity } from "@main/entities/user/entity";
import { parseISO } from "date-fns";
import { CLIENT_URL } from "@main/config/environment";

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
      UserEntity.hydrate({ ...user, emailVerifiedAt: now }, user.id)
    );

    await this.tokensRepository.update(
      TokenEntity.hydrate({ ...token, usedAt: now }, token.id)
    );

    return CLIENT_URL;
  }
}
