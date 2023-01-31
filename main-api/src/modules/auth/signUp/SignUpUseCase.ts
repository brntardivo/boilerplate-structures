import { UserEntity } from "@entities/UserEntity";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { IMailDeliveryProvider } from "@providers/IMailDeliveryProvider";
import { ISignUpDTO } from "@modules/auth/signUp/ISignUpDTO";
import { badRequest, unprocessableEntity } from "@utils/errors";
import { ITokensRepository } from "@repositories/ITokensRepository";
import { TokenEntity } from "@entities/TokenEntity";
import { TokenUsages } from "@config/constants";
import { API_URL, API_PORT } from "@config/environment";
import { add } from "date-fns";
export class SignUpUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository,
    private mailDeliveryProvider: IMailDeliveryProvider
  ) {}
  async execute(data: ISignUpDTO): Promise<object> {
    const exists = await this.usersRepository.findByEmail(data.email);

    if (exists) {
      throw new unprocessableEntity("email already registered");
    }

    const user = await this.usersRepository.create(new UserEntity(data));

    if (!user) {
      throw new badRequest("error on create user");
    }

    const expiresAt = add(new Date(), { days: 1 });

    const token = await this.tokensRepository.create(
      new TokenEntity({
        usage: TokenUsages.emailValidation,
        userId: user.id,
        expiresAt,
      })
    );

    if (!token) {
      throw new badRequest("error on create token");
    }

    await this.mailDeliveryProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "Valide seu cadastro",
      body: {
        url: `${API_URL}:${API_PORT}/auth/validate-token/${token.id}`,
        name: user.name,
      },
    });

    return { userId: user.id, tokenId: token.id };
  }
}
