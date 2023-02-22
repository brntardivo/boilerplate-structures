import { Router } from "express";

import { SignUpSchema } from "@domains/client/auth/signUp/SignUpSchema";
import { SignInSchema } from "@domains/client/auth/signIn/SignInSchema";
import { ValidateTokenSchema } from "@domains/client/auth/validateToken/ValidateTokenSchema";

const router = Router();

router.post("/sign-up", SignUpSchema.validate, async (request, response) => {
  const { signUpController } = await import("@domains/client/auth/signUp");
  return signUpController.handle(request, response);
});

router.post("/sign-in", SignInSchema.validate, async (request, response) => {
  const { signInController } = await import("@domains/client/auth/signIn");
  return signInController.handle(request, response);
});

router.get(
  "/validate-token/:token",
  ValidateTokenSchema.validate,
  async (request, response) => {
    const { validateTokenController } = await import(
      "@domains/client/auth/validateToken"
    );
    return validateTokenController.handle(request, response);
  }
);

export { router };
