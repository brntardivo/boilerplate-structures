import { SignUpUseCase } from "@domains/client/auth/signUp/SignUpUseCase";
import { SignUpController } from "@domains/client/auth/signUp/SignUpController";
import { UsersRepository } from "@repositories/implementations/UsersRepository";
import { OracleMailDeliveryProvider } from "@providers/implementations/OracleMailDeliveryProvider";
import { TokensRepository } from "@repositories/implementations/TokensRepository";

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
