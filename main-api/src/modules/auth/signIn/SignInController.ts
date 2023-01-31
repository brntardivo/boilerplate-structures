import { SignInUseCase } from "@modules/auth/signIn/SignInUseCase";
import { Request, Response } from "express";

export class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const data = await this.signInUseCase.execute({
        email,
        password,
      });

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
