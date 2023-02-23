import { UserEntity } from "@main/entities/user/entity";
import { IUsersRepository } from "@domain/shared/repositories/users/interface";
import { IMailDeliveryProvider } from "@infra/providers/IMailDeliveryProvider";
import { ISignUpDTO } from "@domain/client/signUp/ISignUpDTO";
import { badRequest, unprocessableEntity } from "@main/utils/errors";
import { ITokensRepository } from "@domain/shared/repositories/tokens/interface";
import { TokenEntity } from "@main/entities/token/entity";
import { TokenUsages } from "@domain/shared/constants";
import { API_URL, API_PORT } from "src/main/config/environment";
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

    const user = await this.usersRepository.create(UserEntity.create(data));

    if (!user) {
      throw new badRequest("error on create user");
    }

    const expiresAt = add(new Date(), { days: 1 });

    const token = await this.tokensRepository.create(
      TokenEntity.create({
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
