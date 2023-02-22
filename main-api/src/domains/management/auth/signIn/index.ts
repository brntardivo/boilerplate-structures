import { SignInUseCase } from "@domains/management/auth/signIn/SignInUseCase";
import { SignInController } from "@domains/management/auth/signIn/SignInController";
import { AdminsRepository } from "@repositories/implementations/AdminsRepository";

const adminsRepository = new AdminsRepository();

const signInUseCase = new SignInUseCase(adminsRepository);

const signInController = new SignInController(signInUseCase);

export { signInController };
