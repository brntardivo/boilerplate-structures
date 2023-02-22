import { Router } from "express";
import { AllAdminsSchema } from "@domains/management/admins/allAdmins/AllAdminsSchema";
import { JWTDecrypt } from "@middlewares/JWTDecryptMiddleware";

const router = Router();

router.get(
  "/",
  JWTDecrypt.handle,
  AllAdminsSchema.validate,
  async (request, response) => {
    const { allAdminsController } = await import(
      "@domains/management/admins/allAdmins"
    );
    return allAdminsController.handle(request, response);
  }
);

export { router };
