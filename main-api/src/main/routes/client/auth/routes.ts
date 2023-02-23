import { Router } from "express";

import { SignUpSchema } from "@main/middlewares/validation/client/signUp/schema";
import { SignInSchema } from "@main/middlewares/validation/client/signIn/schema";
import { ValidateTokenSchema } from "@main/middlewares/validation/client/validateToken/schema";

const router = Router();
const prefix = "/client/auth";

router.post("/sign-up", SignUpSchema.validate, async (request, response) => {
  const { signUpController } = await import(
    "@main/usecases/client/signUp/usecase"
  );
  return signUpController.handle(request, response);
});

router.post("/sign-in", SignInSchema.validate, async (request, response) => {
  const { signInController } = await import(
    "@main/usecases/client/signIn/usecase"
  );
  return signInController.handle(request, response);
});

router.get(
  "/validate-token/:token",
  ValidateTokenSchema.validate,
  async (request, response) => {
    const { validateTokenController } = await import(
      "@main/usecases/client/validateToken/usecase"
    );
    return validateTokenController.handle(request, response);
  }
);

export { prefix, router };
