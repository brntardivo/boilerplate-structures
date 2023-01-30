import { IValidateTokenDTO } from '@modules/auth/validateToken/IValidateTokenDTO';
import { IUsersRepository } from '@repositories/IUsersRepository';
import { ITokensRepository } from '@repositories/ITokensRepository';
import { badRequest, unprocessableEntity } from '@utils/errors';
import { TokenEntity } from '@entities/TokenEntity';
import { UserEntity } from '@entities/UserEntity';

export class ValidateTokenUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository
  ) {}
  async execute(data: IValidateTokenDTO): Promise<void> {
    const now = new Date();

    const token = await this.tokensRepository.findById(data.token);

    if (!token) {
      throw new unprocessableEntity('invalid token');
    }

    if (token.expiresAt) {
      const expiresAt = new Date(token.expiresAt);

      if (now > expiresAt) {
        await this.tokensRepository?.delete(token);

        throw new unprocessableEntity('expired token');
      }
    }

    const user = await this.usersRepository.findById(token.userId);

    if (!user) {
      throw new badRequest('user associated with this token not found');
    }

    await this.usersRepository.save(
      new UserEntity({ ...user, emailVerifiedAt: now }, user._id)
    );

    await this.tokensRepository.save(
      new TokenEntity({ ...token, usedAt: now }, token._id)
    );

    return;
  }
}
