import { ValidateTokenUseCase } from "@domain/client/validateToken/ValidateTokenUseCase";
import { ValidateTokenController } from "@main/controllers/client/validateToken/controller";
import { UsersRepository } from "@infra/repositories/users/db.repository";
import { TokensRepository } from "@infra/repositories/tokens/db.repository";

const usersRepository = new UsersRepository();
const tokensRepository = new TokensRepository();

const validateTokenUseCase = new ValidateTokenUseCase(
  usersRepository,
  tokensRepository
);

const validateTokenController = new ValidateTokenController(
  validateTokenUseCase
);

export { validateTokenController };
