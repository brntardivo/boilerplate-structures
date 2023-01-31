import { SignUpUseCase } from "@modules/auth/signUp/SignUpUseCase";
import { Request, Response } from "express";

export class SignUpController {
  constructor(private signUpUseCase: SignUpUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const data = await this.signUpUseCase.execute({
        name,
        email,
        password,
      });

      return res.status(201).json({
        response: true,
        ...data,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(err.statusCode || 400).json({
        response: false,
        message: err.message || "unexpected error",
      });
    }
  }
}
