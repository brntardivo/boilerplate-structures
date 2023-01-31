import { ValidateTokenUseCase } from "@modules/auth/validateToken/ValidateTokenUseCase";
import { Request, Response } from "express";

export class ValidateTokenController {
  constructor(private validateTokenUseCase: ValidateTokenUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.params;

    try {
      await this.validateTokenUseCase.execute({
        token,
      });

      return res.status(200).json({
        response: true,
      });
    } catch (err: any) {
      return res.status(err.statusCode || 400).json({
        response: false,
        message: err.message || "unexpected error",
      });
    }
  }
}
