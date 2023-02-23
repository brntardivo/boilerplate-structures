import { SignUpUseCase } from "@domain/client/signUp/SignUpUseCase";
import { SignUpController } from "@main/controllers/client/signUp/controller";
import { UsersRepository } from "@infra/repositories/users/db.repository";
import { OracleMailDeliveryProvider } from "@infra/providers/implementations/OracleMailDeliveryProvider";
import { TokensRepository } from "@infra/repositories/tokens/db.repository";

const usersRepository = new UsersRepository();
const oracleMailDeliveryProvider = new OracleMailDeliveryProvider();
const tokensRepository = new TokensRepository();

const signUpUseCase = new SignUpUseCase(
  usersRepository,
  tokensRepository,
  oracleMailDeliveryProvider
);

const signUpController = new SignUpController(signUpUseCase);

export { signUpController };
