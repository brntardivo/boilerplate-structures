import { AllAdminsUseCase } from "@domains/management/admins/allAdmins/AllAdminsUseCase";
import { AllAdminsController } from "@domains/management/admins/allAdmins/AllAdminsController";

const allAdminsUseCase = new AllAdminsUseCase();

const allAdminsController = new AllAdminsController(allAdminsUseCase);

export { allAdminsController };
