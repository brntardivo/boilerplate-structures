import { UserEntity } from '@entities/UserEntity';
import { IUsersRepository } from '@repositories/IUsersRepository';
import { IMailDeliveryProvider } from '@providers/IMailDeliveryProvider';
import { ISignUpDTO } from '@modules/auth/signUp/ISignUpDTO';
import { badRequest, unprocessableEntity } from '@utils/errors';
import { ITokensRepository } from '@repositories/ITokensRepository';
import { TokenEntity } from '@entities/TokenEntity';
import { TokenUsages } from '@utils/constants';
import { API_URL, API_PORT } from '@main/config/environment';
export class SignUpUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository,
    private mailDeliveryProvider: IMailDeliveryProvider
  ) {}
  async execute(data: ISignUpDTO): Promise<object> {
    await Promise.all([
      this.usersRepository.startTransaction(),
      this.tokensRepository.startTransaction()
    ]);

    const exists = await this.usersRepository.findByEmail(data.email);

    if (exists) {
      throw new unprocessableEntity('user already exists');
    }

    const user = await this.usersRepository.save(new UserEntity(data));

    if (!user) {
      throw new badRequest('error on create user');
    }

    const date = new Date();
    const expiresAt = date.setDate(date.getDate() + 1);

    const token = await this.tokensRepository.save(
      new TokenEntity({
        usage: TokenUsages.emailValidation,
        userId: user._id,
        expiresAt
      })
    );

    if (!token) {
      throw new badRequest('error on create token');
    }

    await this.mailDeliveryProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: 'Valide seu cadastro',
      body: {
        url: `${API_URL}:${API_PORT}/auth/validate-token/${token._id}`,
        name: user.name
      }
    });

    await Promise.all([
      this.usersRepository.commitTransaction(),
      this.tokensRepository.commitTransaction()
    ]);

    return { userId: user._id, tokenId: token._id };
  }
}
