import { ValidateTokenUseCase } from '@modules/auth/validateToken/ValidateTokenUseCase';
import { ValidateTokenController } from '@modules/auth/validateToken/ValidateTokenController';
import { UsersRepository } from '@repositories/implementations/UsersRepository';
import { TokensRepository } from '@repositories/implementations/TokensRepository';

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
