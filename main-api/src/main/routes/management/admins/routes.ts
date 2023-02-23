import { Router } from "express";
import { AllAdminsSchema } from "@main/middlewares/validation/management/allAdmins/schema";
import { JWTDecrypt } from "@main/middlewares/auth.middleware";

const router = Router();
const prefix = "/management/admins";

router.get(
  "/",
  JWTDecrypt.handle,
  AllAdminsSchema.validate,
  async (request, response) => {
    const { allAdminsController } = await import(
      "@main/usecases/management/allAdmins/usecase"
    );

    return allAdminsController.handle(request, response);
  }
);

export { prefix, router };
