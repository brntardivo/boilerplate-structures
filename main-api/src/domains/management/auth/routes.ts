import { Router } from "express";

import { SignInSchema } from "@domains/management/auth/signIn/SignInSchema";

const router = Router();

router.post("/sign-in", SignInSchema.validate, async (request, response) => {
  const { signInController } = await import("@domains/management/auth/signIn");
  return signInController.handle(request, response);
});

export { router };
