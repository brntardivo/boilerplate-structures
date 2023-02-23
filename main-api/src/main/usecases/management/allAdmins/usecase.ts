import { AllAdminsUseCase } from "@domain/management/allAdmins/AllAdminsUseCase";
import { AllAdminsController } from "@main/controllers/management/allAdmins/controller";

const allAdminsUseCase = new AllAdminsUseCase();

const allAdminsController = new AllAdminsController(allAdminsUseCase);

export { allAdminsController };
