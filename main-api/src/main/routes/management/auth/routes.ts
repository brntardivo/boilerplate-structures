import { Router } from "express";

import { SignInSchema } from "@main/middlewares/validation/management/signIn/schema";

const router = Router();
const prefix = "/management/auth";

router.post("/sign-in", SignInSchema.validate, async (request, response) => {
  const { signInController } = await import(
    "@main/usecases/management/signIn/usecase"
  );
  return signInController.handle(request, response);
});

export { prefix, router };
