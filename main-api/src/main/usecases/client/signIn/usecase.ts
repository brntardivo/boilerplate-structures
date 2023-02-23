import { SignInUseCase } from "@domain/client/signIn/SignInUseCase";
import { SignInController } from "@main/controllers/client/signIn/controller";
import { UsersRepository } from "@infra/repositories/users/db.repository";
import { WorkspacesRepository } from "@infra/repositories/workspaces/db.repository";

const usersRepository = new UsersRepository();
const workspacesRepository = new WorkspacesRepository();

const signInUseCase = new SignInUseCase(usersRepository, workspacesRepository);

const signInController = new SignInController(signInUseCase);

export { signInController };
