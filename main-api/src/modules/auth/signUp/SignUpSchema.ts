import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export class SignUpSchema {
  static validate(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = z
        .object({
          name: z.string(),
          email: z.string().transform((email) => email.trim().toLowerCase()),
          password: z.string().min(6),
          passwordConfirmation: z.string(),
        })
        .superRefine(({ password, passwordConfirmation }, ctx) => {
          if (password !== passwordConfirmation) {
            ctx.addIssue({
              code: "custom",
              message: "the passwords did not match",
            });
          }
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
