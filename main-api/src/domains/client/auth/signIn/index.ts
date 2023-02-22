import { SignInUseCase } from "@domains/client/auth/signIn/SignInUseCase";
import { SignInController } from "@domains/client/auth/signIn/SignInController";
import { UsersRepository } from "@repositories/implementations/UsersRepository";
import { WorkspacesRepository } from "@repositories/implementations/WorkspacesRepository";

const usersRepository = new UsersRepository();
const workspacesRepository = new WorkspacesRepository();

const signInUseCase = new SignInUseCase(usersRepository, workspacesRepository);

const signInController = new SignInController(signInUseCase);

export { signInController };
