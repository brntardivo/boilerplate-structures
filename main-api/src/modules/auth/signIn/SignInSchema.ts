import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export class SignInSchema {
  static validate(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = z.object({
        email: z
          .string()
          .email()
          .transform((email) => email.trim().toLowerCase()),
        password: z.string().min(6),
      });

      schema.parse(req.body);

      return next();
    } catch (error: any) {
      let err = error;

      if (error instanceof ZodError) {
        err = error.format();
      }

      return res.status(422).json({ message: "validation error", err });
    }
  }
}
