import { ValidateTokenUseCase } from "@modules/auth/validateToken/ValidateTokenUseCase";
import { Request, Response } from "express";

export class ValidateTokenController {
  constructor(private validateTokenUseCase: ValidateTokenUseCase) {}

  async handle(req: Request, res: Response): Promise<Response | void> {
    const { token } = req.params;

    try {
      const url = await this.validateTokenUseCase.execute({
        token,
      });

      return res.status(301).redirect(url);
    } catch (err: any) {
      return res.status(err.statusCode || 400).json({
        message: err.message || "unexpected error",
      });
    }
  }
}
