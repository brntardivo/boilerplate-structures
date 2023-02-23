import { SignInUseCase } from "@domain/management/signIn/SignInUseCase";
import { SignInController } from "@main/controllers/management/signIn/controller";
import { AdminsRepository } from "@infra/repositories/admins/db.repository";

const adminsRepository = new AdminsRepository();

const signInUseCase = new SignInUseCase(adminsRepository);

const signInController = new SignInController(signInUseCase);

export { signInController };
