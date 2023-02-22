import { AllAdminsUseCase } from "@domains/management/admins/allAdmins/AllAdminsUseCase";
import { Request, Response } from "express";

export class AllAdminsController {
  constructor(private allAdminsUseCase: AllAdminsUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.allAdminsUseCase.execute(req.body);

      return res.status(200).json({
        ...data,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(err.statusCode || 400).json({
        message: err.message || "unexpected error",
      });
    }
  }
}
